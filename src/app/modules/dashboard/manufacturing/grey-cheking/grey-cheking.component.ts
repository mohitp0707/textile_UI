import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
declare var jQuery: any;

@Component({
  selector: 'app-grey-cheking',
  templateUrl: './grey-cheking.component.html',
  styleUrls: ['./grey-cheking.component.scss']
})
export class GreyChekingComponent implements OnInit {
	party:any=[];
	GodownArr:any=[];
	productList:any=[];
	invoice:any={
		GR_Batch:"",
		TotQty:0,
		Topcs:0,
		TotcQty:0,
		GR_RecMeter:0,
		RecTPCS:0,
		diffMeter:0,
		diffPcs:0
	};
	@ViewChild("focusText") _el: ElementRef;
	partyBatch:any=[];
	params:any={};
	particular:any={
		item:"",
		quantity:0,
		cquantity:0
	};
	RecQtyList:any=[];
	dataadded:boolean=false;
	isValid:boolean=true;
	butDisabled=false;
	isupdate:boolean=false;
	enterPress:boolean=false;
	isSaving:boolean=false;

	
	constructor(public ds : DataServiceService, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) {
		route.params.subscribe(params => {
			if(!params.id){
			this.ds.getData('/GreyParty','Vendor').then((data:any) => {
					this.party = data.recordset|| [];
					jQuery('.selectpicker').selectpicker();
					 this.getgodown();
				},err => {
						console.log(err);
				})
			}else{
				this.isupdate=true;
				this.isValid=false;
				this.butDisabled=true;
				ds.getData('/GRCHK_Retrieve/'+params.id).then((data:any) => {
					this.spinnerService.show();
					if(!data){
						this.ds.invalidForm = true;
						this.ds.errorMessage = "No data found.";
						this.spinnerService.hide();
						return ;
					}
					let party1:string="MOHIT";
					this.invoice=data.recordset[0];
					console.log(data.recordsets[1]);
					// this.particular.item=data.recordsets[1][0].item;
					// this.particular.unit=data.recordsets[1][0].unit;
					this.RecQtyList=data.recordsets[1];
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
	getPartyDet(){
		this.invoice.PM_ID= jQuery('.selectpicker').find("option:selected").val();
		this.invoice.PM_NAME= jQuery('.selectpicker').find("option:selected").text();
		this.getBatchNo(this.invoice);
	}

	// getgodown(){
	// 	this.ds.getData('/Godown').then((data:any) => {
	// 		this.GodownArr = data.recordset|| [];
	// 		// console.log(this.GodownArr);
	// 	},err => {
	// 			console.log(err);
	// 	})
	// }
	getgodown(){
		this.ds.getData('/Godown').then((data:any) => {
			this.GodownArr = data.recordset|| [];
			this.GodownArr= this.GodownArr.filter(product => product.GM_Typ == 'Grey Godown');
		},err => {
				console.log(err);
		})
	}
	  
	getBatchNo(party){
				this.params.partyId=party.PM_ID;
				this.spinnerService.show();
				this.ds.getData('/partyBatch',party.PM_ID).then((data:any) => {
					this.partyBatch = data.recordset|| [];
					this.spinnerService.hide();
				},err => {
						console.log(err);
						this.spinnerService.hide();
				})
		
	}
	getDetails(batchNo){
			this.params.batch=batchNo;
			this.spinnerService.show();
			this.ds.getData('/GetGreyDetail',this.params).then((data:any) => {
			let warehouse=this.invoice.Godown;
			this.invoice=data.recordset[0] ||null;
			this.invoice.Godown=warehouse;
			this.invoice.GR_Batch=batchNo;
			this.invoice.Godown=this.invoice.GR_WH;
			// this.particular=data.recordsets[1][0] || null;
			// this.particular.quantity=0;
			// this.particular.cquantity=0;
			this.RecQtyList=data.recordsets[1];
			console.log(data.recordsets[1]);
			this.calculation();
			this.spinnerService.hide();
		},err => {
			console.log(err);
			this.spinnerService.hide();
		})
	}
	getremqty(enqty,index){
		this.particular.remqty=parseFloat(this.particular.cqty)-parseFloat(enqty);
		
	}
	addParticular(particular){
		if(particular.item==""){
			swal("Error!", "Please Select ItemName!", "error");
		}else if(particular.quantity==0 || particular.cquantity==0 ){
				//alert("Please Insert Quantity");
				swal("Error!", "Please Insert Quantity!", "error");
		}
		else if((this.RecQtyList.length+1)>this.invoice.RecTPCS){
			//alert("Total Pcs not Greater than Rec Pcs");
			swal("Error!", "Total Pcs not Greater than Rec Pcs!", "error");
		}else{
		this.dataadded=true;
		setTimeout(function () {
			jQuery(".selectpicker").selectpicker("refresh");
			jQuery('.selectpicker').selectpicker();
		  }, 250);
		let item = Object.assign({}, particular);
		this.RecQtyList.push(item);
		this._el.nativeElement.focus();
		this.particular.quantity=0;
		this.particular.cquantity=0;
		this.calculateTotal(this.invoice);
		this.invoice.Topcs=this.RecQtyList.length;
		this.invoice.diffMeter=parseFloat(this.invoice.TotQty)-parseFloat(this.invoice.TotcQty);
		this.invoice.diffPcs=parseFloat(this.invoice.Topcs)-parseFloat(this.invoice.RecTPCS);
		this.invoice.counter=this.RecQtyList.length;
		}	
	}
	verticalSum(array, colname){
		let total = 0;
		array.forEach(item => {
			total += Number(item[colname]);
		});
		return total.toFixed(2);
	}
	// removeParticular(index){
	// 	// console.log(index);
	// 	// this.RecQtyList.splice(index, 1);
	// 	this.calculateTotal(this.invoice);
	// 	this.invoice.Topcs=this.RecQtyList.length;
	// 	this.invoice.diffMeter=parseFloat(this.invoice.GR_RecMeter)-parseFloat(this.invoice.TotQty);
	// 	this.invoice.diffPcs=parseFloat(this.invoice.RecTPCS)-parseFloat(this.invoice.Topcs);
	// 	this.invoice.counter=this.RecQtyList.length;
	// }
	calculation(){
		// console.log(index);
		// this.RecQtyList.splice(index, 1);
		this.calculateTotal(this.invoice);
		this.invoice.Topcs=this.RecQtyList.length;
		this.invoice.diffMeter=parseFloat(this.invoice.GR_RecMeter)-parseFloat(this.invoice.TotQty);
		this.invoice.diffPcs=parseFloat(this.invoice.RecTPCS)-parseFloat(this.invoice.Topcs);
		this.invoice.counter=this.RecQtyList.length;
	}
	calculateTotal(invoice){
		invoice.TotQty = this.verticalSum(this.RecQtyList, "quantity");
		invoice.TotcQty=this.verticalSum(this.RecQtyList, "cquantity");

	}
	keyDownFunction(event) {
		// if(event.keyCode == 13) {
		// 	this.enterPress=true;
		// }
	  }
	saveForm(frm,value,event){
			if(this.enterPress==true){
				this.enterPress=false;
			}else{
			this.spinnerService.show();
			if(frm.invalid==true){
				//alert("please Fill Mandetory Fields");
				swal("Error!", "Please Fill Mandetory Fields!", "error");
				this.spinnerService.hide();
			}else if(this.RecQtyList.length<=0){
				//alert("Please Insert item in list");
				swal("Error!", "Please Insert item in list!", "error");
				this.spinnerService.hide();
			}else if(parseFloat(this.RecQtyList.length)<parseFloat(this.invoice.RecTPCS)){
				//alert("Receive Pcs not less than actual receive");
				swal("Error!", "Receive Pcs not less than actual receive!", "error");
				this.spinnerService.hide();
			}else{
			if(this.isupdate==false){
					this.isSaving=true;
					var partyID=this.params.partyId;
					this.invoice.PM_ID=partyID;
					this.invoice.dataList=this.RecQtyList;
					this.ds.postData('/greyCheck', this.invoice).then((data:any) => {
						this.ds.formSubmitted = true;
						frm.resetForm();
						this.invoice={};
						this.RecQtyList=[];
						this.particular={ quantity:0,cquantity:0};
						this.dataadded=false;
						// this.ds.submittedMessage = "Form Submitted Successfully.";
						setTimeout(function () {
							jQuery(".selectpicker").val('').selectpicker("refresh");
							jQuery('.selectpicker').selectpicker();
						  }, 250);
						swal("Success!", "Data Saved Successfully!", "success");
						this.isSaving=false;
						this.spinnerService.hide();
					},err => {
						err = err.json();
						this.ds.invalidForm = true;
						// this.ds.errorMessage = err.error.message;
						swal("Error!", "Receive Pcs not less than actual receive!", "error");
						console.log(err);
						this.isSaving=false;
						this.spinnerService.hide();
					})
				}else{
					this.invoice.dataList=this.RecQtyList;
					this.ds.postData('/greyCheckupdate', this.invoice).then((data:any) => {
						this.ds.formSubmitted = true;
						frm.resetForm();
						this.invoice={};
						this.RecQtyList=[];
						this.particular={ quantity:0,cquantity:0};
						this.dataadded=false;
						// this.ds.submittedMessage = "Form Updated Successfully.";
						setTimeout(function () {
							jQuery(".selectpicker").val('').selectpicker("refresh");
							jQuery('.selectpicker').selectpicker();
						  }, 250);
						swal("Success!", "Data Saved Successfully!", "success");
						this.isSaving=false;
						this.spinnerService.hide();
					},err => {
						err = err.json();
						this.ds.invalidForm = true;
						// this.ds.errorMessage = err.error.message;
						swal("Error!", "Receive Pcs not less than actual receive!", "error");
						console.log(err);
						this.isSaving=false;
						this.spinnerService.hide();
					})
				}
		}
	  }
	}
	reset(){
						this.invoice={};
						this.RecQtyList=[];
						this.particular={ item:"", quantity:0,cquantity:0};
						this.dataadded=false;
						setTimeout(function () {
							jQuery(".selectpicker").val('').selectpicker("refresh");
							jQuery('.selectpicker').selectpicker();
						  }, 250);
						swal("Cleared!", "Form Reset", "info");
	}

  ngOnInit() {
  }

}

