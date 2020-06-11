import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import * as jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
import * as $ from "jquery";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-storereport',
  templateUrl: './storereport.component.html',
  styleUrls: ['./storereport.component.scss']
})
export class StorereportComponent implements OnInit {

  TMeter:any;
  Tpcs:any;
  p: number = 1;
  stockData:any=[];
  today:any;
  maitoday:any;
  GR_Tdat:any;
  GR_Fdat:any;
  invoice:any={};
  serdat:any;
  serdep:any;
  sermachine:any;
  seritm:any;
  serunit:any;
  serqty:any;
  serrate:any;
  seramt:any;

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

  
      
  chanDat(serDat){
    this.today=serDat;
    if(this.today==""){
       this.today=this.maitoday;
    }
   }
  getdata(det){
    let data1:any={};
    data1.GR_Fdat = this.datePipe.transform(this.invoice.GR_Fdat, 'yyyy-MM-dd');
    data1.GR_Tdat = this.datePipe.transform(this.invoice.GR_Tdat, 'yyyy-MM-dd');
    this.ds.getData('/storeReport',data1).then((data:any) => {
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
    doc.text('STORE REPORT', 220, 50);
    doc.setFontSize(8);
    doc.setTextColor(100);
      doc.autoTable({html: '#dattab',margin: {top: 70}});
      doc.save('storereport.pdf');
  }
  exportExcel(){
    $("#dattab").tableExport();
  }


}
