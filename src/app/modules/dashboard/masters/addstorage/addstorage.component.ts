import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-addstorage',
  templateUrl: './addstorage.component.html',
  styleUrls: ['./addstorage.component.scss']
})
export class AddstorageComponent implements OnInit {

states = [];

search = (text$: Observable<string>) =>
text$.pipe(
  debounceTime(200),
  distinctUntilChanged(),
  map(term => term.length < 2 ? []
	: this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
)

  constructor(private location: Location,public ds : DataServiceService, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) {
	
    route.params.subscribe(params => {
		if(params.id){
			ds.getData('/getAllStorage/'+params.id).then((data:any) => {
				if(!data){
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					return ;
				}
				this.addStorage = data.recordset[0];
				this.addStorage.id=params.id;
			},err => {
				this.ds.invalidForm = true;
				this.ds.errorMessage = "No data found.";
				console.log(err);
			});
		}else{
			this.getStorage();
		}
	});

  }
  getStorage(){
		this.ds.getData('/getStorageName').then((data:any) => {
			if(!data){
				this.ds.invalidForm = true;
				this.ds.errorMessage = "No data found.";
				return ;
			}
			this.states = data.recordset;
			this.states = this.states.map(a => a.GM_Name);
		},err => {
			this.ds.invalidForm = true;
			this.ds.errorMessage = "No data found.";
			console.log(err);
		});
  }
  
	addStorage:any= {
		Status:"Active",
		type:"Raw Godown"
	};
	savedisable:boolean=true;
	
	
  ngOnInit() {
	 
  }

  save(fname, input, event){
	let count=this.states.findIndex(x => x.toLowerCase() == input.name.toLowerCase());
	if(count!=-1){
		//alert("Storage Name Already Exist!!");
		swal("Error!", "Storage Name Already Exist!!!!", "error");
	}else if(fname.invalid)
			{
			this.ds.showFormAlert();
			//alert("Please Filled Mandetory fileds");
			swal("Error!", "Please Filled Mandetory fileds!!", "error");
		}else {
			if(input.id){
				// this.ds.updateData('/Inventory_Storagelocations', input.id, input).then(data => {
				// 	// console.log(data);
				// 	this.ds.formSubmitted = true;
				// 	fname.resetForm();
				// 	this.savedisable=true;
				// 	this.ds.submittedMessage = "Form Submitted Successfully.";
				// }, err => {
				// 	this.savedisable=true;
				// 	err = err.json();
				// 	this.ds.invalidForm = true;
				// 	this.ds.errorMessage = err.error.message;
				// 	console.log(err);
				// })
			}
			else {
				this.spinnerService.show();
				this.ds.postData('/GodownInsert', input).then(data => {
					this.ds.formSubmitted = true;
					fname.resetForm();
					this.addStorage={Status:"Active"};
					this.savedisable=true;
					this.ds.submittedMessage = "Form Submitted Successfully."
					this.spinnerService.hide();
				},err => {
					this.savedisable=true;
					err = err.json();
					this.ds.invalidForm = true;
					this.ds.errorMessage = err.error.message;
					console.log(err);
					this.spinnerService.hide();
				})
				this.spinnerService.hide();
			}
		  
		}
	
	
	}

	
  
}
