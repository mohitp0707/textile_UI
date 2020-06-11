import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataServiceService } from '../../../../../provider/data-service.service' ;

@Component({
	selector: 'app-addhouse',
	templateUrl: './addhouse.component.html',
	styleUrls: ['./addhouse.component.scss']
})

export class AddhouseComponent implements OnInit 
{
	// Form Object where all fields bind
	flat : any = {};
	
	// This is for ownerId - userList will used for dropdown options
	users : any = [];
	
	constructor(public ds : DataServiceService, public route : ActivatedRoute){
		
		// Route param for edit data - params.id (which is defined in router config)
		route.params.subscribe(params => {
			
			if(!params.id) return;
			
			ds.getData('/Society_Houses/'+params.id).then(data => {
				if(!data){
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					return ;
				}
				// Assign single data to form object
				this.flat = data;

			},err => {
				this.ds.invalidForm = true;
				this.ds.errorMessage = "No data found.";
				console.log(err);
			});
			
		});
		
		ds.getData('/users').then(data => {
			this.users = data;
			console.log(this.users);
		},err => {
			console.log(err);
		});
		
	}
	
	ngOnInit(){ }
	
	// For Form Submit - @params - 1. ngForm instance, 2. formObject
	submitForm(form, input){
		
		if(form.invalid){
			this.ds.showFormAlert();
			return console.log(form, input);
		}else{
			this.ds.invalidForm = false;
		}
		
		console.log(input);
		this.ds.formSubmitted = true;
		this.ds.submittedMessage = "Form Submitted Successfully.";
		
		if(input.id){
			
			this.ds.updateData('/Society_Houses', input.id, input).then(data => {
				console.log(data);
				this.ds.formSubmitted = true;
			},err => {
				console.log(err);
			})
			
		} else {
			this.ds.postData('/Society_Houses', input).then(data => {
				console.log(data);
				this.ds.formSubmitted = true;
			},err => {
				console.log(err);
			})
		}
	}
	
}
