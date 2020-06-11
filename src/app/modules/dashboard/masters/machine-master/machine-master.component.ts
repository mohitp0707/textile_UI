import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-machine-master',
  templateUrl: './machine-master.component.html',
  styleUrls: ['./machine-master.component.scss']
})
export class MachineMasterComponent implements OnInit {

  states = [];
  Allmachine:any=[];
  show:boolean=false;
  update:boolean=false;

search = (text$: Observable<string>) =>
text$.pipe(
  debounceTime(200),
  distinctUntilChanged(),
  map(term => term.length < 2 ? []
	: this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
)

  addmachine:any={
    PDate:"",
    id:""
  };

  constructor(public ds : DataServiceService, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) { 
  }

  ngOnInit() {
    this.getMachineName();
    this.addmachine.status1='Active';
  }
  getMachineName(){
		this.ds.getData('/getMachineName').then((data:any) => {
			if(!data){
				this.ds.invalidForm = true;
				this.ds.errorMessage = "No data found.";
				return ;
			}
			this.states = data.recordset;
			this.states = this.states.map(a => a.Machine_name);
		},err => {
			this.ds.invalidForm = true;
			this.ds.errorMessage = "No data found.";
			console.log(err);
		});
  }

    save(fname,input){
   
      let count=this.states.findIndex(x => x.toLowerCase() == input.Machine_name.toLowerCase());
	   if(fname.invalid){
            this.ds.showFormAlert();
            swal("Error!", "Please Filled Mandetory fileds!!", "error");
        }else{
          
      if(input.id==""){
        if(count!=-1){
          swal("Error!", "Machine Name Already Exist!!", "error");
	      }
       else{
        this.ds.postData('/MachineInsert', input).then(data => {
          console.log(data);
          this.ds.formSubmitted = true;
          fname.resetForm();
          this.ds.submittedMessage = "Form Submitted Successfully.";
        },err => {
          err = err.json();
          this.ds.invalidForm = true;
          console.log(err);
          this.ds.errorMessage = err.error.message;
          
        })

      }
    }else{
      
           this.ds.postData('/MachineUpdate', input).then(data => {
          this.show=false;
          this.ds.formSubmitted = true;
          fname.resetForm();
          this.ds.submittedMessage = "Form Submitted Successfully.";
        },err => {
          err = err.json();
          this.ds.invalidForm = true;
          console.log(err);
          this.ds.errorMessage = err.error.message;
          
        })
    }
    }
  }
  getAllmachine(){
    this.ds.getData('/getAllMachineName').then((data:any) => {
      if(!data){
        this.ds.invalidForm = true;
        this.ds.errorMessage = "No data found.";
        return ;
      }
      this.show=true;
      this.Allmachine = data.recordset;
      console.log(this.Allmachine);
    },err => {
      this.ds.invalidForm = true;
      this.ds.errorMessage = "No data found.";
      console.log(err);
    });
  }
  edit(id){
    this.update=true;
    this.addmachine=id;
    this.addmachine.Machine_PDate=new Date(id.Machine_PDate);
  }
  chanestatus(id){
    
  }
  
}
