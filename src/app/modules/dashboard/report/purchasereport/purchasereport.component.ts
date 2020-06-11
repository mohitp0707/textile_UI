import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
import * as $ from "jquery";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-purchasereport',
  templateUrl: './purchasereport.component.html',
  styleUrls: ['./purchasereport.component.scss']
})
export class PurchasereportComponent implements OnInit {

  p: number = 1;
  jobIntake:any=[];
  today:any;
  invoice:any={};
  maitoday:any={};
  showdetraw:boolean=false;
  detaildata:any=[];
  serDat:any;
  setsupp:any;
  serDPNO:any;
  sergstt:any;

  constructor(public ds : DataServiceService,private datePipe: DatePipe) { }

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

  getdata(data){
    let data1:any={};
    data1.GR_Fdat = this.datePipe.transform(this.invoice.GR_Fdat, 'yyyy-MM-dd');
    data1.GR_Tdat = this.datePipe.transform(this.invoice.GR_Tdat, 'yyyy-MM-dd');
    this.ds.getData('/PurchaseReport',data1).then((data:any) => {
      this.jobIntake = data.recordset || [];
		},err => {
			console.log(err);
		})
  }
  export(){
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(18);
    doc.text('PURCHASE REPORT', 220, 50);
    doc.setFontSize(8);
    doc.setTextColor(100);
      doc.autoTable({html: '#dattab',margin: {top: 70}});
      doc.save('purchasereport.pdf');
  }
  clickEven(det){
    this.ds.getData('/PurchaseReportdetails',det.id).then((data:any) => {
      this.showdetraw=true;
      this.detaildata = data.recordset || [];
		},err => {
			console.log(err);
		})
  }
  exportExcel(){
    $("#dattab").tableExport();
  }
}
