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
  selector: 'app-userrole',
  templateUrl: './userrole.component.html',
  styleUrls: ['./userrole.component.scss']
})
export class UserroleComponent implements OnInit {

  userName:any=[];
  userRoles:any=[];
	user:any={};
	frmGroup:any=[];
  sershow:boolean=false;
  constructor(public ds : DataServiceService, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) {
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
			this.frmGroup=data.recordsets[1];
		  this.spinnerService.hide();
		},err => {
			console.log(err);
			this.spinnerService.hide();
		})
  }
  
  getuserRole(usr){
		this.ds.getData('/usrRoles',usr).then((data:any) => {
      this.userRoles = data.recordset|| [];
      this.sershow=true;
		  this.spinnerService.hide();
		},err => {
			console.log(err);
			this.spinnerService.hide();
		})
	}
	
	submitForm(form, input){

			this.ds.invalidForm = false;
			input.usrroles=this.userRoles;
			this.ds.postData('/userRoleInsert',input).then(data => {
				this.ds.formSubmitted = true;
				this.userRoles=[];
				this.user={};
				// this.ds.submittedMessage = "Form Save Successfully.";
				swal("successfully!","Successfully ADD ROLES","success");
			}, err => {
				err = err.json();
				this.ds.invalidForm = true;
				/* this.ds.errorMessage = err; */
				console.log(err);
			})
		}

		checks(index,even){
			console.log(index);
			console.log(even);
			this.userRoles[index].saver=even.target.checked;
		}
		checkv(index,even){
			this.userRoles[index].viewr=even.target.checked;
		}
		checkd(index,even){
			this.userRoles[index].delr=even.target.checked;
		}
  ngOnInit() {
  }

}
