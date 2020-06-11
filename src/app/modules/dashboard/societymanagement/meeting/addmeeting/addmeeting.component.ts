import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataServiceService } from '../../../../../provider/data-service.service' ;

@Component({
  selector: 'app-addmeeting',
  templateUrl: './addmeeting.component.html',
  styleUrls: ['./addmeeting.component.scss']
})
export class AddmeetingComponent implements OnInit {

	time = {hour: 10, minute: 10, second: 10};
	meridian = true;
	seconds = true;
	toggleMeridian() {
		this.meridian = !this.meridian;
	}
	toggleSeconds() {
		this.seconds = !this.seconds;
	}
  
	meeting : any = {};
		
	constructor(public ds : DataServiceService, public route : ActivatedRoute){ 
	
	// Route param for edit data - params.id (which is defined in router config)
		route.params.subscribe(params => {
			
			if(!params.id) return;
			
			ds.getData('/Society_Meetings/'+params.id).then(data => {
				if(!data){
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					return ;
				}
				// Assign single data to form object
				this.meeting = data;

			},err => {
				this.ds.invalidForm = true;
				this.ds.errorMessage = "No data found.";
				console.log(err);
			});
			
		});
		
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
			
			this.ds.updateData('/Society_Meetings', input.id, input).then(data => {
				console.log(data);
				this.ds.formSubmitted = true;
				this.ds.submittedMessage = "Form Updated Successfully.";
			}, err => {
				err = err.json();
				this.ds.invalidForm = true;
				/* this.ds.errorMessage = err; */
				console.log(err);
			})
			
		} else {
			this.ds.postData('/Society_Meetings', input).then(data => {
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
