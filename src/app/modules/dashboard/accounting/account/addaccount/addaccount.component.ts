import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataServiceService } from '../../../../../provider/data-service.service' ;
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';


@Component({
  selector: 'app-addaccount',
  templateUrl: './addaccount.component.html',
  styleUrls: ['./addaccount.component.scss']
})
export class AddaccountComponent implements OnInit {

	// Form Object where all fields bind
	account : any = {};
	config : any = {};
	accountData : any = [];
	accountTypes : any = [];
	type : string = "income";
	


	
	constructor(public ds : DataServiceService, public route : ActivatedRoute) {
	
	// Route param for edit data - params.id (which is defined in router config)
		route.params.subscribe(params => {
			
			if(!params.id) return;
			
			ds.getData('/Accounting_Accounts/'+params.id).then(data => {
				if(!data){
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					return ;
				}
				// Assign single data to form object
				this.account = data;

			},err => {
				this.ds.invalidForm = true;
				this.ds.errorMessage = "No data found.";
				console.log(err);
			});
			
		});
		
		this.ds.getConfig("account").then(data => {
			console.log(data);
			this.config = data;
		});
	} 
	
	getConfig(){
		this.ds.getConfig("account").then(data => {
			this.config = data;
			this.getAccountType(this.type);
		})
		.catch(err => {
			console.log(err);
		})
	}
	getAccountType(category){
		this.accountTypes.splice(0, this.accountTypes.length);
		this.accountTypes = this.config.type.filter(item => {
			return item.category == category;
		})
	}

	ngOnInit() {
	}
	
	submitForm(form, input){
		
		if(form.invalid){
			this.ds.showFormAlert();
			return console.log(form, input);
		}else{
			this.ds.invalidForm = false;
		}
		
		console.log(input);

		if(input.id){
			
			this.ds.updateData('/Accounting_Accounts', input.id, input).then(data => {
				console.log(data);
				this.ds.formSubmitted = true;
				/* this.ds.submittedMessage = "Form Submitted Successfully."; */
			}, err => {
				err = err.json();
				/* this.ds.invalidForm = true;
				this.ds.errorMessage = err; */
				console.log(err);
			})
			
		} else {
			this.ds.postData('/Accounting_Accounts', input).then(data => {
				console.log(data);
				this.ds.formSubmitted = true;
				this.ds.submittedMessage = "Form Submitted Successfully.";
			},err => {
				err = err.json();
				this.ds.invalidForm = true;
				this.ds.errorMessage = err.error.message;
				console.log(err);
			})
		}
	}
	
	
	

}

