import { Component, OnInit,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner'; 
import * as $ from "jquery";
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
declare var jQuery: any;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-grey-receive',
  templateUrl: './grey-receive.component.html',
  styleUrls: ['./grey-receive.component.scss']
})
export class GreyReceiveComponent implements OnInit,AfterViewInit {
	ngAfterViewInit(): void {
		// jQuery('.selectpicker').selectpicker();
	}
	party:any=[];
	invoice:any={
		GR_Batch:"",
		user:1,
		RecQtyList:[]	
	};
	selectedProduct:any;
	selectedItems:any=[];
	dropdownSettings = {};
	productList:any=[];
	isDisabled=false;
	butDisabled=false;
	RecQtyList=[];
	particular : any = {
		IM_ID:"",
		unit:"",
		quantity : 0
	};
	batch:any="";
	isValid:boolean=true;
	getBatch:any=[];
	GodownArr:any=[];
	showModal:boolean=false;
	basicdatails:any={};
	details:any=[];
	isSaving:boolean=false;
	resetshow:boolean=true;
	party1:any="sdf";
	@ViewChild("focusText") _el: ElementRef;

  constructor(public ds : DataServiceService,private elementRef:ElementRef,private datePipe: DatePipe , public route : ActivatedRoute,private router:Router,private spinnerService: Ng4LoadingSpinnerService) { 
		this.invoice.GR_Date=new Date();
		this.invoice.GR_Chdate=new Date();
		route.params.subscribe(params => {
			if(!params.id){
				this.spinnerService.show();
				this.ds.getData('/GreyParty','Vendor').then((data:any) => {
					this.party = data.recordset|| [];
					jQuery('.selectpicker').selectpicker();	
					this.party  = this.party.filter(party1 => party1.PM_PTYP == 'Grey Material');
					this.invoice.process="PD";
					this.spinnerService.hide();
				},err => {
						console.log(err);
						this.spinnerService.hide();
				})
			}
			else
			{
				this.resetshow=false;
			ds.getData('/GreyRecieveId/'+params.id).then((data:any) => {
				this.spinnerService.show();
				if(!data){
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					this.spinnerService.hide();
					return ;
				}
		
				this.isValid=false;
				let party1:string="MOHIT";
				this.GodownArr=data.recordsets[2];
				this.invoice=data.recordset[0];
				this.invoice.GR_Date=new Date(data.recordset[0].GR_Date);
				this.batch=data.recordset[0].GR_Batch.substring(2);
				this.invoice.GR_Chdate=new Date(data.recordset[0].GR_Chdate);
				this.invoice.RecQtyList=data.recordsets[1];
				 this.butDisabled=true;
				 this.isDisabled=true;
				 this.getProduct();
				// console.log(this.invoice);
				this.spinnerService.hide();
			},err => {
				this.ds.invalidForm = true;
				this.ds.errorMessage = "No data found.";
				this.spinnerService.hide();
				console.log(err);
			});
			}
	});	
  }
  ngOnInit() {
	// jQuery('.selectpicker').selectpicker();

  }

  getgodown(){
	this.ds.getData('/Godown').then((data:any) => {
		
		this.GodownArr = data.recordset|| [];
		this.GodownArr= this.GodownArr.filter(product => product.GM_Typ == 'Grey Godown');
		// console.log(this.GodownArr);
		this.getProduct();
	},err => {
			console.log(err);
	})
}
  
	getProduct(){
		this.spinnerService.show();
		this.ds.getData('/filterInventory_Products','Grey Material').then((data:any) => {
			this.productList = data.recordset|| [];
			//jQuery('.selectpicker').selectpicker();
			this.spinnerService.hide();
		},err => {
			console.log(err);
			this.spinnerService.hide();
		})
	}
	getPartyDet(){
		this.invoice.PM_ID= jQuery('.selectpicker').find("option:selected").val();
		this.invoice.PM_NAME= jQuery('.selectpicker').find("option:selected").text();
		this.getBatchNo(this.invoice);
	}
	getBatchNo(sid){
	
		this.spinnerService.show();
		var name=sid.PM_NAME || "Mohit";
		this.ds.getData('/GrayBatchNo',sid.PM_ID).then((data:any) => {
			this.batch = data.recordset[0].ID ;
			if(this.batch==0)
			{
				// this.invoice.GR_Batch=name.substring(0,2).toUpperCase()+"B"+1;
				this.batch=1;
				this.invoice.GR_Batch=this.invoice.process+this.batch;
				this.spinnerService.hide();
			}
			else
			{
				this.batch++;
				this.invoice.GR_Batch=this.invoice.process+this.batch;
				this.spinnerService.hide();
			}
		 this.getgodown();
	
		},err => {
			console.log(err);
			this.spinnerService.hide();
		})
	}
	getProcessBatch(procName){
		this.invoice.GR_Batch=procName+this.batch;
	}
  
  
  	addParticular(particular){
		if(particular.IM_ID==""){
			// alert("Please Select Item");
			swal("Error!", "Please Select Item!", "error");
		}else if(this.invoice.pcs==""|| this.invoice.pcs=="" || this.invoice.pcs==0){
			swal("Error!", "Please Insert No of Pcs!", "error");
		}
		else if((this.invoice.RecQtyList.length+1)>this.invoice.pcs){
			//alert("Total Pcs not Greater than Rec Pcs");
			swal("Error!", "Total Pcs not Greater than Rec Pcs!", "error");
		}else{
		 this.isDisabled=true;
		let item = this.particular;
		this._el.nativeElement.focus();
		this.particular={ IM_ID:item.IM_ID,IM_NM:item.IM_NM, unit:item.unit, quantity:0 };
		this.invoice.RecQtyList.push(item);
		this.calculateTotal(this.invoice);
		}
	}
	
		removeParticular(index){
				this.invoice.RecQtyList.splice(index, 1);
				this.calculateTotal(this.invoice);
				if(this.invoice.RecQtyList.length==0){
				 	this.isDisabled=false;
				}
		}
		
		verticalSum(array, colname){
		let total = 0;
		array.forEach(item => {
			total += Number(item[colname]);
		});
		return total.toFixed(2);
	}
	
		calculateTotal(invoice){
		invoice.GR_TQTY = this.verticalSum(this.invoice.RecQtyList, "quantity");
		invoice.TMeter=invoice.GR_TQTY;
	}
	getUnit(detail){
		this.particular.unit=detail;
		
	}
	saveForm(formName,input){
		this.route.params.subscribe(params => {
		if(!params.id){
		this.spinnerService.show();
		if(formName.invalid==true){

			//alert("Please fill require filled");
			swal("Error!", "Please fill require filled!", "error");
			this.spinnerService.hide();

		}else if(this.invoice.RecQtyList.length<=0){
			//alert("Please insert item");
			swal("Error!", "Please insert item!", "error");
			this.spinnerService.hide();
		}else if(this.invoice.GR_WH==""){
			//alert("Please selectt warehouse");
			swal("Error!", "Please select warehouse!", "error");
			this.spinnerService.hide();
		}else if(parseInt((this.invoice.RecQtyList.length))<parseInt(this.invoice.pcs)){
			swal("Error!", "Rec Pcs Not Less than Insert PCS!!", "error");
			this.spinnerService.hide();
		}else{
			this.isSaving=true;
			let itemDetails=input.RecQtyList;
			delete input.RecQtyList;
			itemDetails=itemDetails.map(item => {
				delete item.IM_NM;
				return item;
			})
			input.RecQtyList=itemDetails;
			// console.log(input);
		input.GR_Date = this.datePipe.transform(this.invoice.GR_Date, 'yyyy-MM-dd');
		input.GR_Chdate=this.datePipe.transform(this.invoice.GR_Chdate, 'yyyy-MM-dd');
		this.ds.postData('/greyReceive', input).then((data:any) => {
				this.ds.formSubmitted = true;
				this.invoice={};
				formName.resetForm();
				this.invoice.GR_Chdate=new Date();
				this.invoice.GR_Date=new Date();
				this.particular={};
				 this.isDisabled=false;
				this.invoice.process="PD";
				this.invoice.RecQtyList=[];
				// this.ds.submittedMessage = "Form Submitted Successfully.";
				 jQuery(".selectpicker").val('').selectpicker("refresh");
				swal("Success!", "Data Saved Successfully!", "success");
				this.isSaving=false;
				this.spinnerService.hide();
			},err => {
				err = err.json();
				this.ds.invalidForm = true;
				this.isSaving=false;
				 this.ds.errorMessage = err.error.message;
				swal("Error!", "Error Whilse Saving", "error");
				console.log(err);
			})
		}}else{
			this.spinnerService.show();
			if(formName.invalid==true){
	
				//alert("Please fill require filled");
				swal("Error!", "Please fill require filled!", "error");
				this.spinnerService.hide();
	
			}else if(this.invoice.RecQtyList.length<=0){
				//alert("Please insert item");
				swal("Error!", "Please insert item!", "error");
				this.spinnerService.hide();
			}else if(this.invoice.GR_WH==""){
				//alert("Please selectt warehouse");
				swal("Error!", "Please select warehouse!", "error");
				this.spinnerService.hide();
			}else if(parseInt((this.invoice.RecQtyList.length))<parseInt(this.invoice.pcs)){
				swal("Error!", "Rec Pcs Not Less than Insert PCS!!", "error");
				this.spinnerService.hide();
			}else{
			this.invoice.id=params.id;
			input.GR_Date = this.datePipe.transform(this.invoice.GR_Date, 'yyyy-MM-dd');
			input.GR_Chdate=this.datePipe.transform(this.invoice.GR_Date, 'yyyy-MM-dd');
			this.ds.postData('/greyReceiveUpdate', input).then((data:any) => {
				this.ds.formSubmitted = true;
				this.invoice={};
				this.invoice.GR_Chdate=new Date();
				this.invoice.GR_Date=new Date();
				this.particular={};
				 this.isDisabled=false;
				this.invoice.process="PD";
				this.invoice.RecQtyList=[];
				// this.ds.submittedMessage = "Form Submitted Successfully.";
				jQuery(".selectpicker").val('').selectpicker("refresh");
				swal("Success!", "Data Saved Successfully!", "success");
					
				this.isSaving=false;
				this.spinnerService.hide();
			},err => {
				err = err.json();
				this.ds.invalidForm = true;
				// this.ds.errorMessage = err.error.message;
				swal("Error!", "Error Whilse Saving", "error");
				this.isSaving=false;
				console.log(err);
			})
		}
		}
	});
}
reset(){
				this.invoice={};
				this.invoice.GR_Chdate=new Date();
				this.invoice.GR_Date=new Date();
				this.particular={};
				 this.isDisabled=false;
				this.invoice.process="PD";
				this.invoice.RecQtyList=[];
				// this.ds.submittedMessage = "Form Submitted Successfully.";
				jQuery(".selectpicker").val('').selectpicker("refresh");
				swal("Cleared!", "Form Reset", "info");
}
savPrint(formName,input){
	this.route.params.subscribe(params => {
		if(!params.id){
	this.spinnerService.show();
	if(formName.invalid==true){

		alert("Please fill require filled");
		
		this.spinnerService.hide();

	}else if(this.invoice.RecQtyList.length<=0){
		alert("Please insert item");
		this.spinnerService.hide();
	}else if(this.invoice.GR_WH==""){
		alert("Please selectt warehouse");
		this.spinnerService.hide();
	}
	else
	{
		let itemDetails=input.RecQtyList;
		delete input.RecQtyList;
		itemDetails=itemDetails.map(item => {
			delete item.IM_NM;
			return item;
		})
		input.RecQtyList=itemDetails;
		// console.log(input);
	this.ds.postData('/greyReceive', input).then((data:any) => {
		this.ds.getData('/Printgreyrecieve/'+data.recordset[0].id).then((data1:any) => {
			
			$('#butClick').click();
			 this.basicdatails=data1.recordset[0];
			 this.details=data1.recordsets[1];
			 this.spinnerService.hide();
		  },err => {
			console.log(err);
		  })
		
			this.ds.formSubmitted = true;
			formName.resetForm();
			this.invoice={};
			this.invoice.GR_Chdate=new Date();
			this.invoice.GR_Date=new Date();
			this.particular={};
			this.invoice.process="PD";
			 this.isDisabled=false;
			this.invoice.RecQtyList=[];
			
			this.ds.submittedMessage = "Form Submitted Successfully.";
			
			this.spinnerService.hide();
		},err => {
			err = err.json();
			this.ds.invalidForm = true;
			this.ds.errorMessage = err.error.message;
			console.log(err);
			
		})
	}}else{
		alert("can not update Transaction Entry");
	}
});
}



}
