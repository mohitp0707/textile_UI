import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import * as jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stoc-register-month',
  templateUrl: './stoc-register-month.component.html',
  styleUrls: ['./stoc-register-month.component.scss']
})
export class StocRegisterMonthComponent implements OnInit {

  p: number = 1;
  greyChecking:any=[];
  today:any;
  invoice:any={};
  monthName:any=[];
  astdata:any={};
  rawuptStk:any=[];
  showdetraw:boolean=false;
  maitoday:any;
  GR_Tdat:any;
  GR_Fdat:any;
  setITEM:any;
  serTyp:any;
  serOp:any;
  serClose:any;
  serWH:any;
  
  constructor(public ds : DataServiceService,public sp:Ng4LoadingSpinnerService,private datePipe: DatePipe) { }

  clickEven(data){
    this.showdetraw=true;
    this.sp.show();
    this.astdata.itm=data.itm;
    this.astdata.uni=data.STKMW_UNI;
    this.astdata.wh=data.STKMW_WH;
    this.astdata.fdat=this.invoice.GR_Fdat;
    this.astdata.tdat=this.invoice.GR_Tdat;
    this.astdata.GR_Fdat = this.datePipe.transform(this.invoice.GR_Fdat, 'yyyy-MM-dd');
    this.astdata.GR_Tdat = this.datePipe.transform(this.invoice.GR_Tdat, 'yyyy-MM-dd');
      this.ds.getData('/getStockAst',this.astdata).then((data:any) => {
        this.rawuptStk = data.recordset || [];
        this.astdata={};
        this.sp.hide();
      },err => {
        console.log(err);
        this.sp.hide();
      })
  
  }

  ngOnInit() {

    // this.sp.show();
    // this.ds.getData('/monthName').then((data:any) => {
    //   this.monthName = data.recordset || [];
    //   this.sp.hide();
		// },err => {
    //   console.log(err);
    //   this.sp.hide();
    // })
    this.sp.show();
    this.ds.getData('/getToday').then((data:any) => {
      this.maitoday= data.recordset[0].dat || [];
      this.today = data.recordset[0].dat || [];
      this.invoice.GR_Fdat =new Date( data.recordset[0].fdat  );
      this.invoice.GR_Tdat=new Date(data.recordset[0].tdat );
      this.sp.hide();
		},err => {
      console.log(err);
      this.sp.hide();
		})
  }

  getdatamonth(det){
    this.sp.show();
    let data1:any={};
    data1.GR_Fdat = this.datePipe.transform(this.invoice.GR_Fdat, 'yyyy-MM-dd');
    data1.GR_Tdat = this.datePipe.transform(this.invoice.GR_Tdat, 'yyyy-MM-dd');
    this.ds.getData('/stockReportDaily',data1).then((data:any) => {
      this.greyChecking = data.recordset || [];
      this.sp.hide();
		},err => {
      console.log(err);
      this.sp.hide();
		})
  }

  export(){
    var doc = new jsPDF('l', 'mm');
    doc.setFontSize(18);
    doc.text('STOCK SETTLEMENT', 297, 310);
    doc.setFontSize(7);
    doc.setTextColor(100);
      doc.autoTable({html: '#dattab',margin: {top: 10}});
      doc.save('stocksettlement.pdf');
  }
}
