import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.scss']
})
export class BrokerComponent implements OnInit {

  states = [];

	search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  
	party : any = {
		rfid 	: 1,
		pan 	: 1,
		tan 	: 1,
		gst 	: 1,
		PM_STATUS	:"Active"
	}
	update:boolean=false;;
	constructor(public ds : DataServiceService, public route : ActivatedRoute){
		this.ds.costCenter;
		this.ds.userDetails;
		this.ds.FY;
	  
		// Route param for edit data - params.id (which is defined in router config)
		route.params.subscribe(params => {
			if(params.id){
				this.ds.getData('/broker/'+params.id).then((data:any) => {
					if(!data){
						this.ds.invalidForm = true;
						this.ds.errorMessage = "No data found.";
						return ;
					}
					this.party = data.recordset[0];
					this.update=true;
				},err => {
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					console.log(err);
				});
				
			}
			else
			{
				this.getbroker();
			}
		});
	}
  getbroker(){
	this.ds.getData('/BrokerName/').then((data:any) => {
		if(!data){
			this.ds.invalidForm = true;
			this.ds.errorMessage = "No data found.";
			return ;
    }
		this.states = data.recordset;
		this.states = this.states.map(a => a.PM_NAME);		
	},err => {
		this.ds.invalidForm = true;
		this.ds.errorMessage = "No data found.";
		console.log(err);
	});

}
	ngOnInit() {
	}
	

  
	
	submitForm(form, input){
	
		let count=this.states.findIndex(x => x.toLowerCase() == input.PM_NAME.toLowerCase());
		if(count!=-1){
			//alert("Party Name Already Exist!!");
			swal("Error!", "Party Name Already Exist!!!!", "error");
		}else if(form.invalid){
			this.ds.showFormAlert();
			return console.log(form, input);
		}else{
		if(this.update==true){
			this.ds.postData('/BrokerUpdate', input).then(data => {
				this.ds.formSubmitted = true;
				this.party={};
				this.getbroker();
				 this.ds.submittedMessage = "Form Updated Successfully."; 
			}, err => {
				err = err.json();
				this.ds.invalidForm = true;
				console.log(err);
			})
		}else {
			//  console.log(input);
			this.ds.postData('/BrokerInsert', input).then(data => {
				this.ds.formSubmitted = true;
				this.party={ 	PM_STATUS	:"Active" };
				this.getbroker();
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

}
