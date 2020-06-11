import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {
  states = [];

	search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  
	party : any = {
		PM_ID	:	"",
		PM_TYPE: "",
		PM_STATUS	:"Active"
	}
	broker:any=[];
	update:boolean=false;

	  
	constructor(public ds : DataServiceService, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService){
		this.ds.costCenter;
		this.ds.userDetails;
		this.ds.FY;

		route.params.subscribe(params => {
			if(params.id){
				this.ds.getData('/TransportRetreive/'+params.id).then((data:any) => {
					if(!data){
						this.ds.invalidForm = true;
						this.ds.errorMessage = "No data found.";
						return ;
          }
					this.party = data.recordset[0];
				},err => {
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					console.log(err);
				});
				this.update=true;
			}
			else
			{
				 this.gettransport();
			}	
		});	
	}

  gettransport(){
	this.ds.getData('/TransportName').then((data:any) => {
		if(!data){
			this.ds.invalidForm = true;
			this.ds.errorMessage = "No data found.";
			return ;
    }
    console.log(data.recordset);
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
			swal("Error!", "Party Already Exist!!", "error");
		}else if(form.invalid){
			this.ds.showFormAlert();
			return console.log(form, input);
		}else{
		if(this.update==true){
			this.ds.updateData('/transportupdate', input.id, input).then(data => {
				this.ds.formSubmitted = true;
				this.party={};
				this.gettransport();
				 this.ds.submittedMessage = "Form Updated Successfully."; 

			}, err => {
				err = err.json();
				this.ds.invalidForm = true;
				console.log(err);
			})
		} else {
			this.ds.postData('/transportInsert', input).then(data => {
				this.ds.formSubmitted = true;
				this.party={ 	PM_STATUS	:"Active" };
				this.party.PM_TYPE=input.PM_TYPE;
				 this.gettransport();
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
