import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { map } from 'rxjs/operators/map';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-stockout',
  templateUrl: './stockout.component.html',
  styleUrls: ['./stockout.component.scss']
})
export class StockoutComponent implements OnInit {

  retrive:boolean=false;
  emplist:any=[];
  isValid:boolean=true;
  finalresult:any=[];
  productName:any=[];
	constructor(public ds : DataServiceService, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) { 

		route.params.subscribe(params => {
			if(!params.id){
				this.invoice.GR_Date=new Date();
				this.getgodown();
			}
			else
			{
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
		  this.getProduct();
		},err => {
			console.log(err);
		})
	  }
	particular : any = {
		IM_NM : "",
		unit : "",
		quantity : 0,
		rate:0,
		GR_Date:""
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
		this.invoice.particular.push(item);
		 this.particular={quantity:1,rate:1 };
		}
	}
		removeParticular(index){
		this.invoice.particular.splice(index, 1);
		
	}
	getgodown(){
		this.ds.getData('/Godown').then((data:any) => {
			this.GodownArr = data.recordset|| [];
			// console.log(this.GodownArr);
			this.getEmployee();
		},err => {
				console.log(err);
		})
	}
	getProduct(){
		this.spinnerService.show();
		this.ds.getData('/InventoryProductNotGreyWithGodown',this.invoice.GR_WH).then((data:any) => {
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
	  }
	  getProductName(typ){
		this.productName  = this.productList.filter(product => product.IM_TYP == typ  && product.IM_TYP != 'Grey Material');
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
		this.ds.postData('/StockOutInsert', input).then((data:any) => {
				this.ds.formSubmitted = true;
				formName.resetForm();
				this.invoice={};
				this.invoice.GR_Date=new Date();
				this.particular={quantity:0,rate:0 };
				this.invoice.particular=[];
				this.ds.submittedMessage = "Form Submitted Successfully.";
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

}
