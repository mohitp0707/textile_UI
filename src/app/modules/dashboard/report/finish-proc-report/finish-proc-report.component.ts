import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import * as jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
import * as $ from "jquery";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-finish-proc-report',
  templateUrl: './finish-proc-report.component.html',
  styleUrls: ['./finish-proc-report.component.scss']
})
export class FinishProcReportComponent implements OnInit {

  p: number = 1;
  greyRecive:any=[];
  update:boolean;
  delete:boolean;
  formrights:any=[];
  today:any;
  maitoday:any;
  GR_Tdat:any;
  GR_Fdat:any;
  invoice:any={};
  serDat:any;
  serBatch:any;
  serShade:any;
  serqual:any;
  sersupp:any;
  serProc:any;
  serqty:any;
  serTMTR:any;


  constructor(public ds : DataServiceService,private datePipe: DatePipe) {
   
   }

  ngOnInit() {
    this.ds.getData('/getToday').then((data:any) => {
      this.maitoday= data.recordset[0].dat || [];
      this.today = data.recordset[0].dat || [];
      this.invoice.GR_Fdat =new Date( data.recordset[0].fdat  );
      this.invoice.GR_Tdat=new Date(data.recordset[0].tdat );
		},err => {
			console.log(err);
		})
  }

  
  getdata(det){
    let data1:any={};
    data1.GR_Fdat = this.datePipe.transform(this.invoice.GR_Fdat, 'yyyy-MM-dd');
    data1.GR_Tdat = this.datePipe.transform(this.invoice.GR_Tdat, 'yyyy-MM-dd');
    this.ds.getData('/FinishingProcRecord',data1).then((data:any) => {
      this.greyRecive = data.recordset || [];
      this.calculateTotal();
		},err => {
			console.log(err);
		})
  }


  verticalSum(array, colname){
		let total = 0;
		array.forEach(item => {
			total += Number(item[colname]);
		});
		return total.toFixed(2);
	}
  calculateTotal(){
    console.log(this.verticalSum(this.greyRecive, "mtr"));
    console.log(this.verticalSum(this.greyRecive, "pcs"));
  }
  export(){
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(18);
    doc.text('FINISH PRODUCTION REPORT', 220, 50);
    doc.setFontSize(8);
    doc.setTextColor(100);
      doc.autoTable({html: '#dattab',margin: {top: 70}});
      doc.save('finishproduction.pdf');
  }
  exportExcel(){
    $("#dattab").tableExport();
  }
  chanDat(serDat){
    this.today=serDat;
    if(this.today==""){
       this.today=this.maitoday;
    }
   }

}
