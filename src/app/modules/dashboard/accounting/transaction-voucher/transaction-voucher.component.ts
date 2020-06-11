import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
const swal: SweetAlert = _swal as any;
declare var jQuery: any;
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-transaction-voucher',
  templateUrl: './transaction-voucher.component.html',
  styleUrls: ['./transaction-voucher.component.scss']
})
export class TransactionVoucherComponent implements OnInit {
  invoice : any = {
		partyId : "",
		generatedate : new Date,
		Pay_typ:'bank',
		accname:'disable',
		party:'disable',
		category : "payment",
		particular : [],
		bankPay_typ:'online',
		chequeno:'',
		amount:0,
		// chequdedate:new Date,
		remark : ""
  };
  ispayment:boolean=true;
  accountlist:any=[];
  accountlistbank:any=[];
  accountlistcash:any=[];
  partylist:any=[];
  Retrieve:boolean=false;
  disable:boolean=false;
  isSaving:boolean=false;
  particular : any = {};
  constructor(public ds : DataServiceService, public route : ActivatedRoute, private spinner:Ng4LoadingSpinnerService,private datePipe: DatePipe) { 
    this.invoice.generatedate=new Date();
		route.params.subscribe(params => {
			console.log(params);
			if(params.type){
				this.invoice.category = params.type;
				this.invoice.type = params.type;
				if(params.type=='reciept'){
					this.ispayment=false;
				}
			}
			if(params.id){		
				if(params.type!='reciept'){
				this.Retrieve=true;
				
				ds.getData('/voucherPayRetrievedetails/'+params.id).then((data:any) => {
						this.invoice=data.recordsets[0][0];
						this.ispayment=true;
						this.invoice.particular=data.recordsets[1];
				},err => {
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					console.log(err);
					console.log("fail");
				});
			 }else{
				this.Retrieve=true;
				ds.getData('/voucherPecieptRetrievedetails/'+params.id).then((data:any) => {

					this.invoice=data.recordsets[0][0];
					this.ispayment=false;
					this.invoice.particular=data.recordsets[1];
					},err => {
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					console.log(err);
					console.log("fail");
				});
			 }
			}else{
				this.ds.getData('/Account_masters').then((data:any) => {
						this.accountlist=data.recordset;
						console.log(this.accountlist);
						this.accountlistbank=this.accountlist.filter(item => item.AM_IB == true);
						this.accountlistcash=this.accountlist.filter(item => item.AM_IC == true);
					},err => {
						console.log(err);
				})
				this.ds.getData('/PartyAll','vendor').then((data:any) => {
					this.partylist=data.recordset;
					
				},err => {
					console.log(err);
			})
   		 }
		});
  }

  addParticular(){
		if(this.invoice.amount==0 || this.invoice.PM_NAME=='' || this.invoice.id=='' || this.invoice.accname=='disable' || this.invoice.party=='disable')
		 {
			swal("Error!", "Please Insert required fields!", "error");
		}else if(this.invoice.bankPay_typ=='cheque' && (this.invoice.chequeno=='' || this.invoice.chequdedate=='')){
			swal("Error!", "Please Insert cheque no & cheque dates!", "error");
		}else{
		let obj:any={};
		this.disable=true;
	   // this.invoice.generatedate = this.datePipe.transform(this.invoice.generatedate, 'yyyy-MM-dd');
		this.invoice.chequdedate = this.datePipe.transform(this.invoice.chequdedate, 'yyyy-MM-dd');
		obj.partyId=this.invoice.party.PM_ID;
		obj.partyname=this.invoice.party.PM_NAME;
		obj.amount=this.invoice.amount;
		obj.rmk=this.invoice.remark;
		obj.bankpaytype=this.invoice.bankPay_typ;
		obj.chequeno=this.invoice.chequeno;
		obj.chequdedate=this.invoice.chequdedate;
		  this.invoice.particular.push(obj);
		this.invoice.amount=0;
		this.invoice.remark='';
		this.invoice.chequeno='';
		this.invoice.chequdedate='';
	}
 }
 resetForm(){
	 this.invoice  = {
		partyId : "",
		generatedate : new Date,
		Pay_typ:'bank',
		accname:'disable',
		party:'disable',
		category : "payment",
		particular : [],
		bankPay_typ:'online',
		chequeno:'',
		amount:0,
		remark : ""
  }
 	this.ispayment=true;
 	this.Retrieve=false;
	this.disable=false;
	this.isSaving=false; 
 }
 submitForm(){
	if(this.invoice.particular.length<=0){
		swal("Error!", "Please Insert at lease one row in table", "error");
	}else{
		delete this.invoice.party;
		this.invoice.generatedate = this.datePipe.transform(this.invoice.generatedate, 'yyyy-MM-dd');
		if(this.ispayment==true){
			// this.isSaving=true;
			this.ds.postData('/voucheerPayment', this.invoice).then((data:any) => {
					// this.ds.formSubmitted = true;
					this.invoice.generatedate=new Date();
					jQuery(".selectpicker").val('').selectpicker("refresh");
					swal("Success!", "Data Saved Successfully!", "success");
					this.invoice  = {
						partyId : "",
						generatedate : new Date,
						Pay_typ:'bank',
						accname:'disable',
						party:'disable',
						category : "payment",
						particular : [],
						bankPay_typ:'online',
						chequeno:'',
						amount:0,
						remark : ""
				  	 }
					 this.ispayment=true;
					 this.Retrieve=false;
					this.disable=false;
					this.isSaving=false; 
			},err => {
				
				err = err.json();
				console.log(err);
				this.ds.invalidForm = true;
				this.ds.errorMessage = err.error.message;
				console.log(err);
			})
		}else{
			console.log("receiept call");
			this.ds.postData('/voucheerReciept', this.invoice).then((data:any) => {
				// this.ds.formSubmitted = true;
				this.invoice.generatedate=new Date();
				jQuery(".selectpicker").val('').selectpicker("refresh");
				swal("Success!", "Data Saved Successfully!", "success");
				this.invoice  = {
					partyId : "",
					generatedate : new Date,
					Pay_typ:'bank',
					accname:'disable',
					party:'disable',
					category : "payment",
					particular : [],
					bankPay_typ:'online',
					chequeno:'',
					amount:0,
					remark : ""
				   }
				 this.ispayment=false;
				 this.Retrieve=false;
				this.disable=false;
				this.isSaving=false; 
		},err => {
			
			err = err.json();
			console.log(err);
			this.ds.invalidForm = true;
			this.ds.errorMessage = err.error.message;
			console.log(err);
		})
		}
	}
 }
  removeParticular(index){
		this.invoice.particular.splice(index,1);
  }
  ngOnInit() {
    
  }

}
