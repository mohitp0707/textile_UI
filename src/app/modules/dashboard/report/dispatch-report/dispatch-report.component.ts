import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
import * as $ from "jquery";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dispatch-report',
  templateUrl: './dispatch-report.component.html',
  styleUrls: ['./dispatch-report.component.scss']
})
export class DispatchReportComponent implements OnInit {
  p: number = 1;
  jobIntake:any=[];
  today:any;
  invoice:any={};
  maitoday:any={};
  serDat:any;
  serDPNO:any;
  setsupp:any;
  serbat:any;
  serbail:any;
  serpcs:any;
  sermtr:any;
  servh:any;

  constructor(public ds : DataServiceService,private datePipe: DatePipe) { }

  ngOnInit() {

    this.ds.getData('/getToday').then((data:any) => {
      this.today = data.recordset[0].dat || [];
      this.today = data.recordset[0].dat || [];
      this.invoice.GR_Fdat =new Date( data.recordset[0].fdat  );
      this.invoice.GR_Tdat=new Date(data.recordset[0].tdat );
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
  getdata(data){
    let data1:any={};
    data1.GR_Fdat = this.datePipe.transform(data.GR_Fdat, 'yyyy-MM-dd');
    data1.GR_Tdat = this.datePipe.transform(data.GR_Tdat, 'yyyy-MM-dd');
    this.ds.getData('/DispatchReport',data1).then((data:any) => {
      this.jobIntake = data.recordset || [];
      console.log(this.jobIntake);
		},err => {
			console.log(err);
		})
  }
  export(){
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(18);
    doc.text('DISPATCH REPORT', 220, 50);
    doc.setFontSize(8);
    doc.setTextColor(100);
      doc.autoTable({html: '#dattab',margin: {top: 70}});
      doc.save('dispatch.pdf');
  }
  exportExcel(){
    $("#dattab").tableExport();
  }
}
