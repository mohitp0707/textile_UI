import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
import * as $ from "jquery";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-machinewiseprocess',
  templateUrl: './machinewiseprocess.component.html',
  styleUrls: ['./machinewiseprocess.component.scss']
})
export class MachinewiseprocessComponent implements OnInit {
  processList:any=[];
  ReprocessList:any=[];
  constructor(public ds : DataServiceService,private datePipe: DatePipe) { }

 today:any;
  details:any=[];
  TMeter:any;
  Tpcs:any;
  PTPCS:any=0;PTMTR:any=0;RTPCS:any=0;RTMTR:any=0;
  PPTPCS:any=0;PPTMTR:any=0;RPTPCS:any=0;RPTMTR:any=0;
  p: number = 1;
  invoice:any={};
  serMachine:any;
  serDate:any;
  serShde:any;
  serBatch:any;
  serprcotyp:any;
  serParty:any;
  
  serProc:any;
  maitoday:any;

  ngOnInit() {
    this.ds.getData('/getToday').then((data:any) => {
      this.today = data.recordset[0].dat || [];
      this.invoice.GR_Fdat =new Date( data.recordset[0].fdat  );
      this.invoice.GR_Tdat=new Date(data.recordset[0].tdat );
		},err => {
			console.log(err);
    })}

    chanDat(serDat){
      this.today=serDat;
      if(this.today==""){
         this.today=this.maitoday;
      }
     }

  getdata(data){
    let data1:any={};
    data1.GR_Fdat = this.datePipe.transform(this.invoice.GR_Fdat, 'yyyy-MM-dd');
    data1.GR_Tdat = this.datePipe.transform(this.invoice.GR_Tdat, 'yyyy-MM-dd');
    this.ds.getData('/machinewiseProcess',data1).then((data:any) => {
      this.details = data.recordset || [];
      console.log(this.details);
      this.sum();
		},err => {
			console.log(err);
		})
  }

  sum(){
    this.processList  = this.details.filter(product => product.JPR_PRTYPE == 'Process');
    this.ReprocessList  = this.details.filter(product => product.JPR_PRTYPE == 'Reprocess');
    console.log(this.processList); 
    console.log(this.ReprocessList); 
    this.calculateTotal();
  }

  calculateTotal(){
    this.PTPCS = this.verticalSum(this.processList, "Ttpcs");
    this.PTMTR=  this.verticalSum(this.processList, "Ttmtr");
    this.PPTPCS = this.verticalSum(this.processList, "Ptpcs");
    this.PPTMTR=  this.verticalSum(this.processList, "Ptmtr");
    this.RTPCS = this.verticalSum(this.ReprocessList, "Ttpcs");
    this.RTMTR=  this.verticalSum(this.ReprocessList, "Ttmtr");
    this.RPTPCS = this.verticalSum(this.ReprocessList, "Ptpcs");
    this.RPTMTR=  this.verticalSum(this.ReprocessList, "Ptmtr");

  }

  verticalSum(array, colname){
		let total = 0;
		array.forEach(item => {
			total += Number(item[colname]);
		});
		return total.toFixed(2);
  }
  
  export(){
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(18);
    doc.text('MACHINE PRODUCTION REPORT', 220, 50);
    doc.setFontSize(8);
    doc.setTextColor(100);
      doc.autoTable({html: '#dattab',margin: {top: 70}});
      doc.save('machineproduction.pdf');
  }
  exportExcel(){
    $("#dattab").tableExport();
  }

}
