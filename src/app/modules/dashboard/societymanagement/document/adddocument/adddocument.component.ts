import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataServiceService } from '../../../../../provider/data-service.service' ;

@Component({
  selector: 'app-adddocument',
  templateUrl: './adddocument.component.html',
  styleUrls: ['./adddocument.component.scss']
})
export class AdddocumentComponent implements OnInit {


	document : any = {};
	
	constructor(public ds : DataServiceService, public route : ActivatedRoute){
	  
	  // Route param for edit data - params.id (which is defined in router config)
		route.params.subscribe(params => {
			
			if(!params.id) return;
			
			ds.getData('/Society_Documents/'+params.id).then(data => {
				if(!data){
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					return ;
				}
				// Assign single data to form object
				this.document = data;

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
			
			this.ds.updateData('/Society_Documents', input.id, input).then(data => {
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
			this.ds.postData('/Society_Documents', input).then(data => {
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
