import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

addProduct:any={
status:1,
IM_STATUS:"Active",
IM_TAXTYP:"exclude" 
}

parentCat : any = [];
childCat:any=[];
category:any=[];
categoryList:any=[];
prdouctList:any=[];
update:boolean=false;
taxDetails:any=[];
states = [];
retrieve:boolean=false;

search = (text$: Observable<string>) =>
text$.pipe(
  debounceTime(200),
  distinctUntilChanged(),
  map(term => term.length < 2 ? []
	: this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
)

  constructor(private location: Location,public ds : DataServiceService, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) { 
  
		// Route param for edit data - params.id (which is defined in router config)
		route.params.subscribe(params => {
			if(!params.id){ 
					this.getId(); 
					return;
			}else{
				this.getproduct(params.id);
				
			}
		});
  }
  getproduct(id){
	  this.retrieve=true;
	this.spinnerService.show();
	this.ds.getData('/Inventory_Products_Retreive/'+id).then((data:any) => {
		if(!data){
			this.ds.invalidForm = true;
			this.ds.errorMessage = "No data found.";
			this.getProductName();
			this.spinnerService.hide();
			return ;
			
		}
		this.category=data.recordsets[0];
		this.parentCat  = this.category.filter(item => (item.CAT_PName =="" || item.CAT_PName ==null));
		this.taxDetails=data.recordsets[1];
		this.addProduct = data.recordsets[2][0];
		this.addProduct.IM_TAXTYP="exclude";
		this.childCat  = this.category.filter(item => item.CAT_PName ==this.addProduct.IM_CAT);
		this.spinnerService.hide();
	},err => {
		
		this.ds.invalidForm = true;
		this.ds.errorMessage = "No data found.";
		console.log(err);
		this.spinnerService.hide();
	});
	this.update=true;
  }
  getProductName(){
		this.ds.getData('/productName').then((data:any) => {
			if(!data){
				this.ds.invalidForm = true;
				this.ds.errorMessage = "No data found.";
				return ;
			}
			this.states = data.recordset;
			this.states = this.states.map(a => a.IM_NM);
		},err => {
			this.ds.invalidForm = true;
			this.ds.errorMessage = "No data found.";
			console.log(err);
		});
  }

  getTax(){
    this.ds.getData('/TMdetails').then((data:any) => {
	  this.taxDetails=data.recordset || [];	  
	  this.spinnerService.hide();
	  this.getProductName();
    },err => {
      err = err.json();
      console.log(err);
      this.spinnerService.hide();
    })
  }

  getAllproduc(){
	  this.spinnerService.show();
	this.ds.getData('/Inventory_Products').then((data:any) => {
		if(!data){
			this.ds.invalidForm = true;
			this.ds.errorMessage = "No data found.";
			this.getId(); 
			this.spinnerService.hide();
			return ;
		}
		this.prdouctList = data.recordset[0];
		this.spinnerService.hide();
		
	},err => {
		this.ds.invalidForm = true;
		this.ds.errorMessage = "No data found.";
		console.log(err);
		this.spinnerService.hide();
	});
	this.update=true;

  }

	getParentcat(){	
		this.parentCat  = this.category.filter(item => (item.CAT_PName =="" || item.CAT_PName ==null));
	}
	getChild(parent){
		this.childCat  = this.category.filter(item => item.CAT_PName ==parent);
	}
	getAllcat(){
		this.ds.getData('/getallCategory').then((data:any) => {
			this.category=data.recordset;
			// this.parentCat  = this.category.filter(item => (item.CAT_PName =="" || item.CAT_PName ==null));
			this.getParentcat();
			this.getTax();
			
		});
	}
	
  ngOnInit() {
	  
  }
  getId(){
  this.ds.getData('/itemId',this.ds.costCenterId).then((data:any) => {
				this.addProduct.IM_ID="IM"+data.recordset[0].ID;
				this.getAllcat();
			});	
  }

savedisable:boolean=true;  
save(fname,input,event){
	let count=this.states.findIndex(x => x.toLowerCase() == input.IM_NM.toLowerCase());
	if(count!=-1){
		//alert("Item Name Already Exist!!");
		swal("Error!", "Item Name Already Exist!!", "error");
	}else if(fname.invalid)
	{
		this.ds.showFormAlert();
		//alert("Please Filled Mandetory fileds");
		swal("Error!", "Please Filled Mandetory fileds!!", "error");
	}else{
	 this.savedisable=false;
	 
	 if(this.update==true){
		this.spinnerService.show();
		this.ds.updateData('/itemInsert', input.IM_ID, input).then(data => {
				this.ds.formSubmitted = true;
				fname.resetForm();
				this.addProduct={ IM_STATUS:"Active",
				IM_TAXTYP:"exclude" };
				this.savedisable=true;
				this.getId();
				this.ds.submittedMessage = "Form Submitted Successfully.";
				this.spinnerService.hide();
			}, err => {
				this.savedisable=true;
				err = err.json();
				this.ds.invalidForm = true;
				this.ds.errorMessage = err.error.message;
				console.log(err);
				this.spinnerService.hide();
			})
		 }
		 else
				{

			this.spinnerService.show();
			this.ds.postData('/itemInsert', input).then(data => {
				this.ds.formSubmitted = true;
				fname.resetForm();
				this.addProduct={ IM_STATUS:"Active",
				IM_TAXTYP:"exclude" };
				this.savedisable=true;
				this.getId();
				this.ds.submittedMessage = "Form Submitted Successfully.";
				this.spinnerService.hide();
			},err => {
				this.savedisable=true;
				err = err.json();
				this.ds.invalidForm = true;
				console.log(err);
				this.ds.errorMessage = err.error.message;
				this.spinnerService.hide();
			})
		}
			
	
	}
}

}
