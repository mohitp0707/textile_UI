import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
import * as $ from "jquery";

@Component({
  selector: 'app-finishgood-report',
  templateUrl: './finishgood-report.component.html',
  styleUrls: ['./finishgood-report.component.scss']
})
export class FinishgoodReportComponent implements OnInit {

  constructor(public ds : DataServiceService) { }

  p: number = 1;
  jobIntake:any=[];
  today:any;
  sersupp:any;
  serBatch:any;
  serBail:any;
  serPcs:any;
  serMtr:any;
  serWH:any;


  ngOnInit() {
    this.ds.getData('/getToday').then((data:any) => {
      this.today = data.recordset[0].dat || [];
      this.getdata();
		},err => {
			console.log(err);
		})
  }
  getdata(){
    this.ds.getData('/finisgoodReport').then((data:any) => {
			this.jobIntake = data.recordset || [];
		},err => {
			console.log(err);
		})
  }
  export(){
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(18);
    doc.text('FINISH GOODS REPORT', 220, 50);
    doc.setFontSize(8);
    doc.setTextColor(100);
      doc.autoTable({html: '#dattab',margin: {top: 70}});
      doc.save('finishgoods.pdf');
  }
  exportExcel(){
    $("#dattab").tableExport();
  }
}
