import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

	states = [];

	search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  party:any={
	EM_Photo:"",
	EM_Salary:0,
	EM_mail:"",
	EM_Mob:"",
	EM_Dob:"",
	EM_Add:"",
	EM_CITY:"",
	EM_Dist:"",
	EM_State:"",
	EM_PIN:"",
	EM_Gender:"",
	EM_Qualification:"",
	EM_Adhar:"",
	EM_Blood:"",
	EM_LocAdd:"",EM_HomePH:"",EM_JDate:"",EM_BACC:"",EM_IFSC:"",EM_St:"Active",
	EM_Dep:"",EM_Des:"",EM_CMail:"",EM_PF:"",EM_ESIC:"",EM_Bank:"",EM_Branch:"",EM_BACT:"",

  };
  update:boolean=false;

  constructor(public ds : DataServiceService, public route : ActivatedRoute) {

    route.params.subscribe(params => {
			if(params.id){
				ds.getData('/Employee/'+params.id).then((data:any) => {
					if(!data){
						this.ds.invalidForm = true;
						this.ds.errorMessage = "No data found.";
						this.getEmployee();
						return ;
					}
					this.party = data.recordset[0];
					this.party.id=params.id;
				},err => {
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					console.log(err);
				});
				this.update=true;
			}else{
				this.getEmployee();
			}
		});
   }

   getEmployee(){
	this.ds.getData('/employeeName').then((data:any) => {
		if(!data){
			this.ds.invalidForm = true;
			this.ds.errorMessage = "No data found.";
			return ;
		}
		this.states = data.recordset;
		this.states = this.states.map(a => a.EM_Name);
	},err => {
		this.ds.invalidForm = true;
		this.ds.errorMessage = "No data found.";
		console.log(err);
	});

}

  ngOnInit() {
  }
  submitForm(form,input){
	let count=this.states.findIndex(x => x.toLowerCase() == input.EM_Name.toLowerCase());
	if(count!=-1){
		//alert("Employee Name Already Exist!!");
		swal("Error!", "Employee Name Already Exist!!", "error");
	}else if(form.invalid){
	   // alert("Please Insert valid fileds ");
	   swal("Error!", "Please Insert valid fileds!", "error");
		}else{
			this.ds.invalidForm = false;
			if(this.update==true){
			
				// console.log(input);
				this.ds.updateData('/EmployeeUpdate', input.id, input).then(data => {
					this.ds.formSubmitted = true;
					/* this.ds.submittedMessage = "Form Updated Successfully."; */
				}, err => {
					err = err.json();
					this.ds.invalidForm = true;
					/* this.ds.errorMessage = err; */
					console.log(err);
				})
				
			} else {
				console.log(input);
				this.ds.postData('/EmployeeInsert', input).then(data => {
					this.ds.formSubmitted = true;
					this.party={EM_St:"Active"};
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


