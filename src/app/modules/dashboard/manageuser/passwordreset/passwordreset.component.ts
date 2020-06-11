import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})
export class PasswordresetComponent implements OnInit {

  user:any={
    emp:""
  };
  userName:any=[];
  constructor(public ds : DataServiceService,private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
		this.spinnerService.show();
		this.ds.getData('/userName').then((data:any) => {
      let userId=localStorage.getItem("userName");
      this.userName = data.recordset|| [];
      // this.userName = this.userName.map(a => a.USR_Name);
      let getUserId:any=[];
      getUserId= this.userName.filter(userName => userName.USR_Name == userId);
      if(getUserId[0].USR_ID!=1){
          this.userName  = this.userName.filter(userName => userName.USR_Name == userId);
        }
		  this.spinnerService.hide();
		},err => {
			console.log(err);
			this.spinnerService.hide();
		})
	}
	passmatch(input){
		if(input.password!=input.confpass){
			input.confpass="";
			swal("Error!","Password and confired Password not match","error");
		}
  }
  submitForm(frm,data){
    if(frm.invalid==true){
      swal("Error!","Please Enter Mendatory Fields","error");
    }else if(this.user.emp==""){
      swal("Error!","Please Enter Username","error");
    }else if(data.password==""){
      swal("Error!","Please Enter Password","error");
    }else if(data.confpass==""){
      swal("Error!","Please Enter Confirm Password","error");
    }else{
      this.spinnerService.show();
      this.ds.postData('/passwordupdate', data).then(data => {
				this.ds.formSubmitted = true;
        this.user={};
        this.spinnerService.hide();
        swal("successfully!","Password changed Successfully","success");
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
