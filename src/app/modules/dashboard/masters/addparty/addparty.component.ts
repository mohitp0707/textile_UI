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
  selector: 'app-addparty',
  templateUrl: './addparty.component.html',
  styleUrls: ['./addparty.component.scss']
})
export class AddpartyComponent implements OnInit {

	 states = [];
	stateslist:any=['Andra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
	'Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Madya Pradesh','Maharashtra','Manipur',
	'Meghalaya','Mizoram','Nagaland','Orissa','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telagana','Tripura','Uttaranchal','Uttar Pradesh','West Bengal'
	,'Delhi','Pondicherry'];
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
		rfid 	: 1,
		pan 	: 1,
		tan 	: 1,
		gst 	: 1,
		config 	: 1,
		department : 1,
		PM_COUNTRY:'India',
		PM_STATUS	:"Active",
		PM_STATE:"Maharashtra"
	}
	broker:any=[];
	update:boolean=false;

	  
	constructor(public ds : DataServiceService, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService){
		this.ds.costCenter;
		this.ds.userDetails;
		this.ds.FY;
				
		// Route param for edit data - params.id (which is defined in router config)
		route.params.subscribe(params => {
			
			if(params.type){
				this.party.PM_TYPE = params.type;
			}
		
			if(params.PM_ID){
				
				this.ds.getData('/Party/'+params.PM_ID).then((data:any) => {
					if(!data){
						this.ds.invalidForm = true;
						this.ds.errorMessage = "No data found.";
						return ;
					}
					console.log(data.recordsets[1][0]);
					this.broker=data.recordsets[0];
					this.party = data.recordsets[1][0];
					// this.party.PM_STATE="Maharashtra";
					this.party.PM_DOB=new Date(data.recordsets[1][0].PM_DOB);
				},err => {
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					console.log(err);
				});
				this.update=true;
			}
			else
			{
				this.getparty(params.type);

			}	
		});	
	}

	getBroker(){
		this.spinnerService.show();
		this.ds.getData('/brokerdet').then((data:any) => {
			this.broker = data.recordset|| [];
			this.spinnerService.hide();
		},err => {
				console.log(err);
				this.spinnerService.hide();
		})
	}

getparty(params){
	this.ds.getData('/PartyName/',params).then((data:any) => {
		if(!data){
			this.ds.invalidForm = true;
			this.ds.errorMessage = "No data found.";
			return ;
		}
		this.states = data.recordset;
		this.states = this.states.map(a => a.PM_NAME);
		this.getId();
		
	},err => {
		this.ds.invalidForm = true;
		this.ds.errorMessage = "No data found.";
		console.log(err);
	});

}
	ngOnInit() {
	}
	
	getId(){
		this.ds.getData('/partyId/'+this.party.PM_TYPE).then((data:any) => {
				if(this.party.PM_TYPE=='client')
				{
				this.party.PM_ID="C"+data.recordset[0].PM_ID;
				}
				else
				{
				this.party.PM_ID="S"+data.recordset[0].PM_ID;	
				}
				this.getBroker();
			});
			
		}
  
	
	submitForm(form, input){
	
		let count=this.states.findIndex(x => x.toLowerCase() == input.PM_NAME.toLowerCase());
		if(count!=-1){
			//alert("Party Name Already Exist!!");
			swal("Error!", "Party Name Already Exist!!", "error");
		}else if(form.invalid){
			this.ds.showFormAlert();
			return console.log(form, input);
		}else{
		if(this.update==true){
			this.ds.updateData('/partyupdate', input.id, input).then(data => {
				this.ds.formSubmitted = true;
				this.party={};
				this.getparty(input.PM_TYPE);
				 this.ds.submittedMessage = "Form Updated Successfully."; 

			}, err => {
				err = err.json();
				this.ds.invalidForm = true;
				/* this.ds.errorMessage = err; */
				console.log(err);
			})
			
		} else {
			// console.log(input);
			this.ds.postData('/partyInsert', input).then(data => {
				this.ds.formSubmitted = true;
				this.party={ 	PM_STATUS	:"Active" };
				this.party.PM_TYPE=input.PM_TYPE;
				this.getparty(input.PM_TYPE);
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