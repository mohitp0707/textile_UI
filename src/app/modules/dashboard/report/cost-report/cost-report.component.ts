import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import * as jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
import * as $ from "jquery";

@Component({
  selector: 'app-cost-report',
  templateUrl: './cost-report.component.html',
  styleUrls: ['./cost-report.component.scss']
})
export class CostReportComponent implements OnInit {

  TMeter:any;
  Tpcs:any;
  p: number = 1;
  costData:any=[];
  showdetraw:boolean=false;
  detaildata:any=[];
  batchdetails:any;
  serDat:any;
  sersupp:any;
  serproc:any;
  sershade:any;
  serbat:any;
  setyp:any;
  serpcs:any;
  sermtr:any;
  sercst:any;
  seramt:any;
  constructor(public ds : DataServiceService) { }

  ngOnInit() {
    this.ds.getData('/costReport').then((data:any) => {
      this.costData = data.recordset || [];

		},err => {
			console.log(err);
		})
  }
  clickEven(det){
    // console.log(det.JPR_ID);
    this.ds.getData('/CostReportDetails',det.JPR_ID).then((data:any) => {
      this.showdetraw=true;
      this.batchdetails=data.recordset[0].JPR_batch;
      this.detaildata = data.recordsets[1]|| [];
		},err => {
			console.log(err);
		})
  }
  export(){
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(18);
    doc.text('COST REPORT', 220, 50);
    doc.setFontSize(8);
    doc.setTextColor(100);
      doc.autoTable({html: '#dattab',margin: {top: 70}});
      doc.save('costreport.pdf');
  }
  exportExcel(){
    $("#dattab").tableExport();
  }


}
