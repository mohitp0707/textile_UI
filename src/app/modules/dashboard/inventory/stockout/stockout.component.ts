import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { map } from 'rxjs/operators/map';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
declare var jQuery: any;
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-stockout',
  templateUrl: './stockout.component.html',
  styleUrls: ['./stockout.component.scss']
})
export class StockoutComponent implements OnInit {

@ViewChild("focusText") _el: ElementRef;
  retrive:boolean=false;
  emplist:any=[];
  isValid:boolean=true;
  finalresult:any=[];
  productName:any=[];
  dropdisable:boolean=false;
  product:any;
	constructor(public ds : DataServiceService,private datePipe: DatePipe, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) { 

		route.params.subscribe(params => {
			if(!params.id){
				
				this.getgodown();
				this.invoice.GR_Date=new Date();
			}else{
			ds.getData('/StockOutId/'+params.id).then((data:any) => {
				this.spinnerService.show();
				if(!data){
					
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					this.spinnerService.hide();
					return ;
				}
				this.retrive=true;
				this.invoice=data.recordset[0];
				this.invoice.GR_Date=new Date(data.recordset[0].GR_Date);
				this.invoice.particular=data.recordsets[1];
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
	
	invoice : any = {
		particular : []
	};
	getEmployee(){
		this.ds.getData('/employee').then((data:any) => {
		  this.emplist = data.recordset|| [];
		 // this.getProduct();
		},err => {
			console.log(err);
		})
	  }
	particular : any = {
		IM_NM : "",
		unit : "",
		quantity : 0,
		rate:0
	};
	GodownArr:any=[];
	productList:any=[];
  	ngOnInit() {
			
 	 	}


  addParticular(particular){
		let item = Object.assign({}, particular);
		if(particular.IM_NM==""){
			//alert("Please Select Item");
			swal("Error!", "Please Select Item!", "error");
		}else if(typeof(particular.IM_NM)=='undefined'){
			//alert("Please Select Item");
			swal("Error!", "Please Select Item!", "error");
		}
		else if(particular.quantity<=0 || particular.quantity=="" ){
			//alert("Please Insert Valid Quantity");
			swal("Error!", "Please Insert Valid Quantity!", "error");
		}else if(particular.quantity>particular.qty){
			//alert("Available Stock is: "+particular.qty);
			swal("Error!", "Available Stock is:"+particular.qty, "error");
		}
		else if(particular.IM_UM==""){
			//alert("Unit is not Empty");
			swal("Error!", "Unit is not Empty!", "error");
		}else if(particular.rate=="" || particular.rate==0 || particular.rate<=0){
			//alert("Please Insert correct rate");
			swal("Error!", "Please Insert correct rate!", "error");
		}
		else{
		this.dropdisable=true;
		this.invoice.particular.push(item);
		 this.particular={quantity:1,rate:1 };
		 this._el.nativeElement.focus();
		}
	}
		removeParticular(index){
		this.invoice.particular.splice(index, 1);
		if(this.invoice.particular.length<=0){
			this.dropdisable=false;
		}
		
	}
	getgodown(){
		this.ds.getData('/Godown').then((data:any) => {
			this.GodownArr = data.recordset|| [];
			this.GodownArr= this.GodownArr.filter(product => product.GM_Typ == 'Store Godown');
			// console.log(this.GodownArr);
			this.getEmployee();
		},err => {
				console.log(err);
		})
	}
	getProduct(){
		// console.log(this.invoice.GR_Date);
		let data1:any={};
		data1.GR_Date = this.datePipe.transform(this.invoice.GR_Date, 'yyyy-MM-dd');
		data1.GR_WH=this.invoice.GR_WH;
		this.spinnerService.show();
		this.ds.getData('/InventoryProductNotGreyWithGodownandDate',data1).then((data:any) => {
			this.productList = data.recordset|| [];
			this.getpructType();
			this.spinnerService.hide();
		},err => {
			console.log(err);
			this.spinnerService.hide();
		})
	}

	getUnit(detail){
		this.particular.unit=detail.IM_UM;
		this.particular.rate=detail.rate;
	}
	getpructType(){
		let test:any=[];
		test  = this.productList.filter(product => product.IM_TYP != 'Grey Material');
		let result = test.map(a => a.IM_TYP);
		this.finalresult = result.filter((IM_TYP, i,product) => i === product.indexOf(IM_TYP));
		jQuery('.selectpicker').selectpicker();
	  }
	  getProductName(typ){
		this.productName  = this.productList.filter(product => product.IM_TYP == typ  && product.IM_TYP != 'Grey Material');
		this.spinnerService.show();
		setTimeout(function () {
		  jQuery(".selectpicker").selectpicker("refresh");
		  jQuery('.selectpicker').selectpicker();
		}, 250);
		this.spinnerService.hide();
	  }
	  getItemDetails(){
		this.particular.IM_ID= jQuery('.selectpicker').find("option:selected").val();
		this.particular.IM_NM= jQuery('.selectpicker').find("option:selected").text();
		let productdetails:any=[];
		productdetails  = this.productName.filter(product => product.IM_ID == this.particular.IM_ID && product.IM_NM==this.particular.IM_NM);
		console.log(productdetails[0]);
		this.particular.IM_UM=productdetails[0].IM_UM;
		this.particular.qty=productdetails[0].qty;
		this.particular.rate=productdetails[0].rate;
		this.getUnit(this.particular);
	  }

	saveForm(formName,input){
		this.route.params.subscribe(params => {
			if(!params.id){
		this.spinnerService.show();
		if(formName.invalid==true){
			//alert("Please fill require filled");
			swal("Error!", "Please fill require filled!", "error");
			this.spinnerService.hide();
		}else if(this.invoice.particular.length<=0){
			//alert("Please insert item");
			swal("Error!", "Please insert item!", "error");
			this.spinnerService.hide();
		}else if(this.invoice.GR_WH==""){
			//alert("Please selectt warehouse");
			swal("Error!", "Please selectt warehouse!", "error");
			this.spinnerService.hide();
		}
		else
		{
			// let itemDetails=input.RecQtyList;
			// delete input.RecQtyList;
			// itemDetails=itemDetails.map(item => {
			// 	delete item.IM_ID;
			// 	return item;
			// })
			// input.RecQtyList=itemDetails;
			// console.log(input);
		input.GR_Date = this.datePipe.transform(this.invoice.GR_Date, 'yyyy-MM-dd');
		this.ds.postData('/StockOutInsert', input).then((data:any) => {
				this.ds.formSubmitted = true;
				formName.resetForm();
				this.invoice={};
				this.invoice.GR_Date=new Date();
				this.particular={IM_NM : "",quantity:0,rate:0 };
				this.invoice.particular=[];
				// this.ds.submittedMessage = "Form Submitted Successfully.";
				setTimeout(function () {
					jQuery(".selectpicker").val('').selectpicker("refresh");
				  }, 250);
				swal("Success!", "Data Saved Successfully!", "success");
				this.spinnerService.hide();
			},err => {
				err = err.json();
				this.ds.invalidForm = true;
				this.ds.errorMessage = err.error.message;
				console.log(err);
				
			})
		}}else{
			//alert("can not update Transaction Entry");
			swal("Error!", "can not update Transaction Entry!", "error");
		}
	});
}
reset(){
	this.invoice={};
				this.invoice.GR_Date=new Date();
				this.particular={IM_NM : "",quantity:0,rate:0 };
				this.invoice.particular=[];
				// this.ds.submittedMessage = "Form Submitted Successfully.";
				setTimeout(function () {
					jQuery(".selectpicker").val('').selectpicker("refresh");
				  }, 250);
				  swal("Cleared!", "Form Reset", "info");
}

}
