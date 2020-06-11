import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import * as jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
import * as $ from "jquery";

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.scss']
})
export class StockReportComponent implements OnInit {

  TMeter:any;
  Tpcs:any;
  p1: number = 1;
  p: number = 1;
  stockData:any=[];
  unchekedstockData:any=[];
  sersupp:any;
  serchal:any;
  serBatch:any;
  serPC:any;
  sermtr:any;
  serwar:any;
  sersupp1:any;
  serchal1:any;
  serBatch1:any;
  serPC1:any;
  sermtr1:any;
  serwar1:any;
  serWH:any;
  
  constructor(public ds : DataServiceService) { }

  ngOnInit() {
    this.ds.getData('/StockReport').then((data:any) => {
      console.log(data);
      this.stockData = data.recordset || [];
      this.unchekedstockData=data.recordsets[1];

		},err => {
			console.log(err);
		})
  }
  export(){
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(18);
    doc.text('STOCK REPORT(CHEKED)', 220, 50);
    doc.setFontSize(8);
    doc.setTextColor(100);
      doc.autoTable({html: '#dattab',margin: {top: 70}});
      doc.save('stockreportchek.pdf');
  }
  exportExcel(){
    $("#dattab").tableExport();
  }

  export2(){
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(18);
    doc.text('STOCK REPORT(UNCHEKED)', 220, 50);
    doc.setFontSize(8);
    doc.setTextColor(100);
      doc.autoTable({html: '#dattab2',margin: {top: 70}});
      doc.save('stockreportunchek.pdf');
  }




}
