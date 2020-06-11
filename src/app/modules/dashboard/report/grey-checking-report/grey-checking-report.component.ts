import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import * as jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-grey-checking-report',
  templateUrl: './grey-checking-report.component.html',
  styleUrls: ['./grey-checking-report.component.scss']
})
export class GreyCheckingReportComponent implements OnInit {

  p: number = 1;
  greyChecking:any=[];
  today:any;
  invoice:any={};
  maitoday:any;
  setDat:any;
  sersupp:any;
  serBatch:any;
  serPcs:any;
  serMtr:any;
  serRmt:any;
  serDmtr:any;
  setProc:any;


  constructor(public ds : DataServiceService,private datePipe: DatePipe) { }

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
    this.ds.getData('/GreyCheckingRecord',data1).then((data:any) => {
      this.greyChecking = data.recordset || [];
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
    doc.text('GREY CHECKING LIST', 220, 50);
    doc.setFontSize(8);
    doc.setTextColor(100);
      doc.autoTable({html: '#dattab',margin: {top: 70}});
      doc.save('greychecking.pdf');
  }
}
