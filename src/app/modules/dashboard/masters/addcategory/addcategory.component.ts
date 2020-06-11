import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent implements OnInit {

states = [];
allcategory:any=[];
show:boolean=false;
search = (text$: Observable<string>) =>
text$.pipe(
  debounceTime(200),
  distinctUntilChanged(),
  map(term => term.length < 2 ? []
	: this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
)
  constructor(public ds : DataServiceService) { 
		this.getparent();
  }
  parentCat:any=[];
  category:object={
  };
  savedisable:boolean=true;
  showTable:boolean=false;

  ngOnInit() {
  }

  getparent(){
	this.ds.getData('/getCategory').then((data:any) => {
			  this.parentCat = data.recordset || [];
			  this.getCategory();
		  },err => {
			  console.log(err);
		  })
  }
  getCategory(){
	this.ds.getData('/categoryName').then((data:any) => {
		if(!data){
			this.ds.invalidForm = true;
			this.ds.errorMessage = "No data found.";
			return ;
		}
		this.states = data.recordset;
		this.states = this.states.map(a => a.CAT_Name);
	},err => {
		this.ds.invalidForm = true;
		this.ds.errorMessage = "No data found.";
		console.log(err);
	});
}
  
save(fname,value)
			{
		let count=this.states.findIndex(x => x.toLowerCase() == value.categoryName.toLowerCase());
			if(count!=-1){
			//alert("Item Name Already Exist!!");
			swal("Error!", "Item Name Already Exist!!", "error");
			}else{
			if(!value.id)	{
				this.ds.postData('/Category', value).then(data => {
				this.parentCat.push(data);
				this.ds.formSubmitted = true;
				fname.resetForm();
				this.getparent();
				this.savedisable=true;
				this.showTable=false;
				this.ds.submittedMessage = "Form Submitted Successfully.";
			},err => {
				this.savedisable=true;
				err = err.json();
				this.ds.invalidForm = true;
				this.ds.errorMessage = err.error.message;
				console.log(err);
			})
				
			}
			else
			{
			this.ds.updateData('/Product_Categories',value.id, value).then(data => {
				this.parentCat.push(data);
				this.ds.formSubmitted = true;
				fname.resetForm();
				this.savedisable=true;
				this.showTable=false;
				this.ds.submittedMessage = "Data Updated Successfully.";
				
			
			},err => {
				this.savedisable=true;
				err = err.json();
				this.ds.invalidForm = true;
				this.ds.errorMessage = err.error.message;
				console.log(err);
			})	
			}
			}}
			
			getAllCategory(){
				this.ds.getData('/AllcategoryName').then((data:any) => {
				  if(!data){
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					return ;
				  }
				  this.show=true;
				  this.allcategory = data.recordset;
				
				},err => {
				  this.ds.invalidForm = true;
				  this.ds.errorMessage = "No data found.";
				  console.log(err);
				});
			  }
}
