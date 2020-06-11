import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
import * as $ from "jquery";

@Component({
  selector: 'app-raw-stock',
  templateUrl: './raw-stock.component.html',
  styleUrls: ['./raw-stock.component.scss']
})
export class RawStockComponent implements OnInit {

  TMeter:any;
  Tpcs:any;
  p: number = 1;
  stockData:any=[];
  serItm:any;
  serunit:any;
  serQty:any;
  serRat:any;
  seramt:any;
  serTyp:any;
  serWH:any;
  constructor(public ds : DataServiceService) { }

  ngOnInit() {
    this.ds.getData('/RawStockReport').then((data:any) => {
      this.stockData = data.recordset || [];
      this.calculateTotal();
		},err => {
			console.log(err);
    })
  }
    
    calculateTotal(){
      this.TMeter = this.verticalSum(this.stockData, "amt");
    }

    getColor(item:any) {
        if(item.Qty<=0){
            return 'bg-danger';
        }else if(item.Qty <= item.mnstk){
          return 'table-danger';
        }else{ return 'abc';
    }}
  
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
    doc.text('RAW STOCK REPORT', 220, 50);
    doc.setFontSize(8);
    doc.setTextColor(100);
      doc.autoTable({html: '#dattab',margin: {top: 70}});
      doc.save('rawstock.pdf');
  }
  exportExcel(){
    $("#dattab").tableExport();
  }

}
