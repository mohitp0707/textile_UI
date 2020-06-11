import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { map } from 'rxjs/operators/map';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-stockin',
  templateUrl: './stockin.component.html',
  styleUrls: ['./stockin.component.scss']
})
export class StockinComponent implements OnInit {

	retrive:boolean=false;
	emplist:any=[];
	isValid:boolean=true;

	constructor(public ds : DataServiceService, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) { 

		route.params.subscribe(params => {
			if(!params.id){
				this.invoice.GR_Date=new Date();
				this.getgodown();
			}
			else
			{
			ds.getData('/StockInId/'+params.id).then((data:any) => {
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

    getEmployee(){
      this.ds.getData('/employee').then((data:any) => {
        this.emplist = data.recordset|| [];
        this.getProduct();
      },err => {
          console.log(err);
      })
    }
  addParticular(particular){
		let item = Object.assign({}, particular);
		if(particular.IM_NM==""){
			//alert("Please Select Item");
			swal("Error!", "Please Select Item!", "error");
		}else if(particular.quantity<=0 || particular.quantity=="" || particular.quantity==0){
			//alert("Please Insert Valid Quantity");
			swal("Error!", "Please Insert Valid Quantity!", "error");
		}else if(particular.IM_UM==""){
			//alert("Unit is not Empty");
			swal("Error!", "Unit is not Empty!", "error");
		}else if(particular.rate=="" || particular.rate==0 || particular.rate<=0){
			//alert("Please Insert correct rate");
			swal("Error!", "Please Insert correct rate!", "error");
		}
		else{
		this.invoice.particular.push(item);
		 this.particular={quantity:0,rate:0 };
		}
	}
		removeParticular(index){
		this.invoice.particular.splice(index, 1);
		
	}
	getgodown(){
		this.ds.getData('/Godown').then((data:any) => {
			this.GodownArr = data.recordset|| [];
			this.getEmployee();
			
		},err => {
				console.log(err);
		})
	}
	getProduct(){
		this.spinnerService.show();
		this.ds.getData('/InventoryProductInvoice','Grey Material').then((data:any) => {
			this.productList = data.recordset|| [];
			this.spinnerService.hide();
		},err => {
			console.log(err);
			this.spinnerService.hide();
		})
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
		this.ds.postData('/StockInInsert', input).then((data:any) => {
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

