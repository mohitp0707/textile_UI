import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import * as jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
import * as $ from "jquery";
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-jobintakereport',
  templateUrl: './jobintakereport.component.html',
  styleUrls: ['./jobintakereport.component.scss']
})
export class JobintakereportComponent implements OnInit {


  p: number = 1;
  greyRecive:any=[];
  update:boolean;
  delete:boolean;
  formrights:any=[];
  today:any;
  maitoday:any;
  GR_Tdat:any;
  GR_Fdat:any;
  invoice:any={};
  serqty:any;
  serTMTR:any;
  serBatch:any;
  sersupp:any;
  serDat:any;

  constructor(public ds : DataServiceService,private datePipe: DatePipe) { 
  
  }

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
    let data:any={};
    data.GR_Fdat = this.datePipe.transform(this.invoice.GR_Fdat, 'yyyy-MM-dd');
    data.GR_Tdat = this.datePipe.transform(this.invoice.GR_Tdat, 'yyyy-MM-dd');
    this.ds.getData('/jobIntakeReport',data).then((data:any) => {
			this.greyRecive = data.recordset || [];
		},err => {
			console.log(err);
		})
  }


  verticalSum(array, colname){
		let total = 0;
		array.forEach(item => {
			total += Number(item[colname]);
		});
		return total.toFixed(2);
	}
  calculateTotal(){
    console.log(this.verticalSum(this.greyRecive, "TQTY"));
  }
  export(){
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(18);
    doc.text('JOB CARD INTAKE', 220, 50);
    doc.setFontSize(8);
    doc.setTextColor(100);
      doc.autoTable({html: '#dattab',margin: {top: 70}});
      doc.save('jobcardintake.pdf');
  }
  exportExcel(){
    $("#dattab").tableExport();
  }


}
