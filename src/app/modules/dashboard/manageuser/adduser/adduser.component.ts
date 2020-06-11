import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {


	user : any = { }
	emplist:any=[];
	userName:any=[];
	constructor(public ds : DataServiceService, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) {
		// Route param for edit data - params.id (which is defined in router config)
	route.params.subscribe(params => {	
			if(!params.id){
				this.getUser();
			}else{	
			}
		});	
	} 

	getUser(){
		this.spinnerService.show();
		this.ds.getData('/userName').then((data:any) => {
		  this.userName = data.recordset|| [];
		  this.userName = this.userName.map(a => a.USR_Name);
		  this.getEmploye();
		  this.spinnerService.hide();
		},err => {
			console.log(err);
			this.spinnerService.hide();
		})
	}
	
	getEmploye(){
		this.spinnerService.show();
		this.ds.getData('/employee').then((data:any) => {
		  this.emplist = data.recordset|| [];
		  this.spinnerService.hide();
		},err => {
			console.log(err);
			this.spinnerService.hide();
		})
	   }
	ngOnInit() { }
	
	passmatch(input){
		console.log(input);
		if(input.password!=input.confirmPassword){
			input.confirmPassword="";
			swal("Error!","Password and confired Password not match","error");
		}
	}
	
	submitForm(form, input){
		
		let count=this.userName.findIndex(x => x.toLowerCase() == input.name.toLowerCase());
		if(count!=-1){
			swal("Error!", "UserName already Present", "error");
		}else if(form.invalid){
			swal("Error!", "Please fill require detail!", "error");
		}else{
			this.ds.invalidForm = false;
			this.spinnerService.show();
			this.ds.postData('/usrInsert', input).then(data => {
				this.ds.formSubmitted = true;
				this.user={};
				// this.ds.submittedMessage = "Form Save Successfully.";
				this.spinnerService.hide();
				swal("successfully!","Add User Successfully","success");
				this.getUser();
			}, err => {
				err = err.json();
				this.ds.invalidForm = true;
				/* this.ds.errorMessage = err; */
				console.log(err);
			})
		}
}
}
