import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { map } from 'rxjs/operators/map';
import * as $ from "jquery";
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
declare var jQuery: any;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  retrive:boolean=false;
  emplist:any=[];
  isValid:boolean=true;
  machine:any=[];
  process:any={};
  department:any=[];
  productName:any=[];
  finalresult:any=[];
  product:any;
  dropdisable:boolean=false;

	constructor(public ds : DataServiceService, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService,private datePipe: DatePipe) { 
		
	
		route.params.subscribe(params => {
			if(!params.id){
				this.invoice.GR_Date=new Date();
				this.getgodown();
			}
			else
			{
			ds.getData('/storeret/'+params.id).then((data:any) => {
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
		GR_Date:"",
		GR_WH:"",
		particular : []
	};
	getEmployee(){
		this.ds.getData('/employee').then((data:any) => {
      this.emplist = data.recordset|| [];
      this.getMachine();
		},err => {
			console.log(err);
		})
    }
    
  getMachine(){
      this.spinnerService.show();
      this.ds.getData('/machine').then((data:any) => {
        this.machine = data.recordset|| [];
        this.spinnerService.hide();
        this.getDeptment();
      },err => {
        console.log(err);
        this.spinnerService.hide();
      })
    }

    getDeptment(){
        this.spinnerService.show();
        this.ds.getData('/getDept').then((data:any) => {
          this.department = data.recordset|| [];
		  this.spinnerService.hide();
		  this.particular={};
          this.getProduct();
        },err => {
          console.log(err);
          this.spinnerService.hide();
        })
      
    }

	particular : any = {
		IM_NM : "",
		unit : "",
		quantity : 0,
		rate:0,
	};
	GodownArr:any=[];
	productList:any=[];
  	ngOnInit() {
			// this.invoice.GM_Name="Store Godown";
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
			swal("Error!", "Available Stock is: "+particular.qty, "error");
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
			
			this.GodownArr= this.GodownArr.filter(product => product.GM_Typ == 'Raw Godown');
			// console.log(this.GodownArr);
			this.getEmployee();
		},err => {
				console.log(err);
		})
	}


	getProduct(){
		
			// this.datePipe.transform(this.invoice.GR_Date, 'yyyy-MM-dd');
		this.invoice.GR_Date = this.datePipe.transform(this.invoice.GR_Date, 'yyyy-MM-dd');
		
		this.spinnerService.show();
			this.particular={	
					IM_NM : "",
					unit : "",
					quantity : 0,
					rate:0
		};
		this.invoice.GR_Date=new Date(this.invoice.GR_Date);
		this.ds.getData('/InventoryProductNotGreyWithGodownandDate',this.invoice).then((data:any) => {
			this.finalresult=[];
			jQuery(".selectpicker").selectpicker("refresh");
			this.invoice.IM_TYP="";
			this.productList = data.recordset|| [];
			// console.log(this.productList);
			this.getpructType();
			this.spinnerService.hide();
		},err => {
			console.log(err);
			this.spinnerService.hide();
		})
	}
	savprocs(proc){
		if(proc.procName==""){
			// alert("Please Insert Department Name");
			swal("Error","Please Insert Department Name","error");
		}else{
			this.ds.postData('/DeptInsert', proc).then((data:any) => {
	  this.process={};
				swal("Success","Process Save Successfully","success");
				$('#Close').click();
				this.getDeptment();
			},err => {
				err = err.json();
				console.log(err);
			})
		}
}
reset(frm){
	frm.resetForm();
	this.dropdisable=false;
	this.productList.length=0;
	this.invoice={};
	this.invoice.GR_Date=new Date();
	this.particular={quantity:0,rate:0 };
	this.invoice.particular=[];
	this.productName=[];
	this.invoice.GR_Date=new Date();
	jQuery(".selectpicker").val('').selectpicker("refresh");
	swal("Cleared!", "Form Reset", "info");
}

	getpructType(){
		let test:any=[];
		this.particular  = {
			IM_NM : "",
			unit : "",
			quantity : 0,
			rate:0,
		};
		test  = this.productList.filter(product => product.IM_TYP != 'Grey Material');
		let result = test.map(a => a.IM_TYP);
		this.finalresult=[];
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
		console.log(this.productName);
		productdetails  = this.productName.filter(product => product.IM_ID == this.particular.IM_ID && product.IM_NM==this.particular.IM_NM);
		this.particular.IM_UM=productdetails[0].IM_UM;
		this.particular.qty=productdetails[0].qty;
		this.particular.rate=productdetails[0].rate;
		this.getUnit(this.particular);
		// console.log(this.particular);
	  }
	  

	getUnit(detail){
		this.particular.unit=detail.IM_UM;
		this.particular.rate=detail.rate;
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
			swal("Error!", "Please select warehouse!", "error");
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
		this.ds.postData('/StoreInsert', input).then((data:any) => {
				this.ds.formSubmitted = true;
				formName.resetForm();
				this.invoice={};
				this.invoice.GR_Date=new Date();
				this.particular={quantity:0,rate:0 };
				this.invoice.particular=[];
				this.productName=[];
				this.dropdisable=false;
				this.getgodown();
				jQuery(".selectpicker").val('').selectpicker("refresh");
				swal("Success!", "Data Saved Successfully!", "success");
				// this.ds.submittedMessage = "Form Submited Successfully.";
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
