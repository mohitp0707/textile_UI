import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
import * as $ from "jquery";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-packingreport',
  templateUrl: './packingreport.component.html',
  styleUrls: ['./packingreport.component.scss']
})
export class PackingreportComponent implements OnInit {

  constructor(public ds : DataServiceService,private datePipe: DatePipe) { }

  p: number = 1;
  jobIntake:any=[];
  today:any;
  invoice:any={};
  maitoday:any;
  serDat:any;
  sersupp:any;
  serBatch:any;
  serBail:any;
  serPcs:any;
  serMtr:any;
  serWH:any;
  serDate:any;
  ngOnInit() {
    this.ds.getData('/getToday').then((data:any) => {
      this.today = data.recordset[0].dat || [];
      this.invoice.GR_Fdat =new Date( data.recordset[0].fdat);
      this.invoice.GR_Tdat=new Date(data.recordset[0].tdat);
		},err => {
			console.log(err);
		})
  }
  getdata(data){
    let data1:any={};
    data1.GR_Fdat = this.datePipe.transform(this.invoice.GR_Fdat, 'yyyy-MM-dd');
    data1.GR_Tdat = this.datePipe.transform(this.invoice.GR_Tdat, 'yyyy-MM-dd');
    this.ds.getData('/packReport',data1).then((data:any) => {
			this.jobIntake = data.recordset || [];
		},err => {
			console.log(err);
		})
  }
  chanDat(serDat){
    this.today=serDat;
    if(this.today==""){
       this.today=this.maitoday;
    }
   }
  export(){
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(18);
    doc.text('PACKING REPORT', 220, 50);
    doc.setFontSize(8);
    doc.setTextColor(100);
      doc.autoTable({html: '#dattab',margin: {top: 70}});
      doc.save('packingreport.pdf');
  }
  exportExcel(){
    $("#dattab").tableExport();
  }

}
