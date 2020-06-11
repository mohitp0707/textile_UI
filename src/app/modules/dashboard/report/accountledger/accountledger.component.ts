import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import 'jspdf-autotable';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DatePipe } from '@angular/common';
declare var jQuery: any;

@Component({
  selector: 'app-accountledger',
  templateUrl: './accountledger.component.html',
  styleUrls: ['./accountledger.component.scss']
})
export class AccountledgerComponent implements OnInit {

  constructor(public ds : DataServiceService,public sp:Ng4LoadingSpinnerService,private datePipe: DatePipe) { }
  maitoday:any;
  today:any;
  invoice:any={};
  party:any=[];
  datalist:any=[];
  ngOnInit() {
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
    this.ds.getData('/accountlist').then((data:any) => {
      this.party = data.recordset || [];
      jQuery('.selectpicker').selectpicker();	
      },err => {
        console.log(err);
    })
  }
  getPartyDet(){
    this.invoice.PM_ID= jQuery('.selectpicker').find("option:selected").val();
		this.invoice.PM_NAME= jQuery('.selectpicker').find("option:selected").text();
  }
  getdata(data){
    let passdata:any={};
    passdata.Fdate = this.datePipe.transform(this.invoice.GR_Fdat, 'yyyy-MM-dd');
    passdata.Tdate=this.datePipe.transform(this.invoice.GR_Tdat, 'yyyy-MM-dd');
    passdata.accid=this.invoice.PM_ID;
    this.ds.getData('/Accoutnledger',data).then((data:any) => {
          this.datalist=data.recordset;
	    },err => {
			console.log(err);
		})
    //console.log(data);
  }

}
