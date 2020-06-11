import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../../provider/data-service.service' ;
@Component({
  selector: 'app-addnotice',
  templateUrl: './addnotice.component.html',
  styleUrls: ['./addnotice.component.scss']
})
export class AddnoticeComponent implements OnInit {
notice : any = {};
  constructor(public ds : DataServiceService, public route : ActivatedRoute) 
  {
	 route.params.subscribe(params => {
			
			if(!params.id) return;
			
			ds.getData('/Society_Notices/'+params.id).then(data => {
				if(!data){
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					return ;
				}
				//Assign single data to form object
				this.notice = data;

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
			
			this.ds.updateData('/Society_Notices', input.id, input).then(data => {
				console.log(data);
				this.ds.formSubmitted = true;
				this.ds.submittedMessage = "Form Updated Successfully.";
			}, err => {
				err = err.json();
				this.ds.invalidForm = true;
				
				console.log(err);
			})
			
		} else {
			this.ds.postData('/Society_Notices', input).then(data => {
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
