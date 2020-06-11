import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataServiceService } from '../../../../../provider/data-service.service' ;

@Component({
  selector: 'app-addincome',
  templateUrl: './addincome.component.html',
  styleUrls: ['./addincome.component.scss']
})
export class AddincomeComponent implements OnInit {

	partyList : any = [];
	config : any = {};
	transactionTypes : any = [];
	income : any = {};
	type : string = "income";
	
	constructor(public ds : DataServiceService, public route : ActivatedRoute){
	  
		// Route param for edit data - params.id (which is defined in router config)
		route.params.subscribe(params => {
			
			if(params.id){
			
				ds.getData('/Accounting_Transactions/'+params.id).then(data => {
					if(!data){
						this.ds.invalidForm = true;
						this.ds.errorMessage = "No data found.";
						return ;
					}
					// Assign single data to form object
					this.income = data;

				},err => {
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					console.log(err);
				});
				
			}else if(params.type){
				this.type = params.type;
				this.getTransactionType(this.type);
			}
			
		});
		
		this.getParty();
	}
	
	getParty(){
		let params = {
			where : {
				category : this.type == "income" ? "client" : "vendor",
				type : this.type == "income" ? "client" : "vendor"
			},
			fields : ["id", "name"]
		}
		
		this.ds.getData('/Accounting_Parties', params).then(data => {
			this.partyList = data || [];
		},err => {
			console.log(err);
		});
		
	}

	getTransactionType(category){
		this.transactionTypes.splice(0, this.transactionTypes.length);
		this.transactionTypes = this.config.type.filter(item => {
			return item.category === category;
		})
	}
	
	ngOnInit(){
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
			
			this.ds.updateData('/Accounting_Transactions', input.id, input).then(data => {
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
			this.ds.postData('/Accounting_Transactions', input).then(data => {
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
