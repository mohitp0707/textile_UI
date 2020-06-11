import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
import * as $ from "jquery";


@Component({
  selector: 'app-job-card-stock-report',
  templateUrl: './job-card-stock-report.component.html',
  styleUrls: ['./job-card-stock-report.component.scss']
})
export class JobCardStockReportComponent implements OnInit {

  TMeter:any;
  Tpcs:any;
  p: number = 1;
  stockData:any=[];
  sersupp:any;
  serBatch:any;
  serQual:any;
  sershade:any;
  serTpc:any;
  serQty:any;
  constructor(public ds : DataServiceService) { }

  ngOnInit() {
    this.ds.getData('/JobCardStockReport').then((data:any) => {
      this.stockData = data.recordset || [];
      this.calculateTotal();
		},err => {
			console.log(err);
		})
  }

  calculateTotal(){
    this.TMeter = this.verticalSum(this.stockData, "Qty");
    this.Tpcs=this.verticalSum(this.stockData, "Tpcs");
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
    doc.text('JOB CARD STOCK', 220, 50);
    doc.setFontSize(8);
    doc.setTextColor(100);
      doc.autoTable({html: '#dattab',margin: {top: 70}});
      doc.save('jobcardstock.pdf');
  }
  exportExcel(){
    $("#dattab").tableExport();
  }
}
