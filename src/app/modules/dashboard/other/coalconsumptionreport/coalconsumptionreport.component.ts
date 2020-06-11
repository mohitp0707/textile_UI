import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
import * as $ from "jquery";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-coalconsumptionreport',
  templateUrl: './coalconsumptionreport.component.html',
  styleUrls: ['./coalconsumptionreport.component.scss']
})
export class CoalconsumptionreportComponent implements OnInit {

  amt:any;
  p: number = 1;
  stockData:any=[];
  stockData1:any=[];
  column:any=[];
  constructor(public ds : DataServiceService,private datePipe: DatePipe) { }
  today:any;
  maitoday:any;
  GR_Tdat:any;
  GR_Fdat:any;
  invoice:any={};
  objectKeys = Object.keys;
  data:boolean=false;

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
    this.data=true;
    this.stockData1=[];
    this.column=[];
    let data1:any={};
    data1.GR_Fdat = this.datePipe.transform(this.invoice.GR_Fdat, 'yyyy-MM-dd');
    data1.GR_Tdat = this.datePipe.transform(this.invoice.GR_Tdat, 'yyyy-MM-dd');
    this.ds.getData('/coalConsuReport',data1).then((data:any) => {
      this.stockData = data.recordset || [];
      this.stockData1.push(data.recordset[0] || []);
      for (let key of this.stockData1) {
        for(var i in key){
          //  console.log('key: ' +  i + ',  value: ' + key[i]);
          this.column.push(i);
          // console.log(i);
     }
    }
      // this.calculateTotal();
    },err => {
      console.log(err);
    })
  }



  calculateTotal(){
    this.amt = this.verticalSum(this.stockData, "amt");
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
    doc.text('Grey Receive list', 220, 50);
    doc.setFontSize(8);
    doc.setTextColor(100);
      doc.autoTable({html: '#dattab',margin: {top: 70}});
      doc.save('table.pdf');
  }
  exportExcel(){
    $("#dattab").tableExport();
  }


}
