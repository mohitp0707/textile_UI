import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-taxmaster',
  templateUrl: './taxmaster.component.html',
  styleUrls: ['./taxmaster.component.scss']
})
export class TaxmasterComponent implements OnInit {

  states = [];

search = (text$: Observable<string>) =>
text$.pipe(
  debounceTime(200),
  distinctUntilChanged(),
  map(term => term.length < 2 ? []
	: this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
)

getTaxName(){
  this.ds.getData('/taxName').then((data:any) => {
    if(!data){
      this.ds.invalidForm = true;
      this.ds.errorMessage = "No data found.";
      return ;
    }
    this.states = data.recordset;
    this.states = this.states.map(a => a.TAX_Name);
  },err => {
    this.ds.invalidForm = true;
    this.ds.errorMessage = "No data found.";
    console.log(err);
  });
}

   

  tax:any={
    name:"",
    TAX_SGST:0,
    TAX_CGST:0,
    TAX_IGST:0
  };
  taxDetails:any=[];
  show:boolean=false;
  constructor(public ds : DataServiceService, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) { 
      this.getTaxName();
  }
  isupdate:boolean=false;

  ngOnInit() {
  }

  save(fname, input){
    let count=this.states.findIndex(x => x.toLowerCase() == input.TAX_Name.toLowerCase());
    if(count!=-1){
     // alert("Tax Name Already Exist!!");
     swal("Error!", "Tax Name Already Exist!!", "error");
    }else if(fname.invalid)
			{
			  this.ds.showFormAlert();
        //alert("Please Filled Mandetory fileds");
        swal("Error!", "Please Filled Mandetory fileds!!", "error");
        }else if(!input.TAX_ID) {
				  this.spinnerService.show();
				  this.ds.postData('/tAX_Insert', input).then(data => {
					this.ds.formSubmitted = true;
          fname.resetForm();
          this.getDeatils();
					this.ds.submittedMessage = "Form Submitted Successfully."
					this.spinnerService.hide();
				},err => {
					err = err.json();
					this.ds.invalidForm = true;
					this.ds.errorMessage = err.error.message;
					console.log(err);
					this.spinnerService.hide();
				})
				this.spinnerService.hide();
    }else if (input.TAX_ID){
      console.log("upd");
      this.spinnerService.show();
      this.ds.postData('/tAX_Update', input).then(data => {
      this.ds.formSubmitted = true;
      fname.resetForm();
      this.getDeatils();
      this.ds.submittedMessage = "Form Updated Successfully."
      this.spinnerService.hide();
    },err => {
      err = err.json();
      this.ds.invalidForm = true;
      this.ds.errorMessage = err.error.message;
      console.log(err);
      this.spinnerService.hide();
    })
    this.spinnerService.hide();

    }
  }
  getDeatils(){
    this.show=true;
    this.ds.getData('/TMdetails').then((data:any) => {
      this.taxDetails=data.recordset || [];
      this.spinnerService.hide();
    },err => {
      err = err.json();
      console.log(err);
      this.spinnerService.hide();
    })
  }

  getTax(id){
    console.log(id);
    this.isupdate=true;
    this.ds.getData('/TMdetailsID',id).then((data:any) => {
      this.tax=data.recordset[0] || [];
      this.spinnerService.hide();
    },err => {
      err = err.json();
      console.log(err);
      this.spinnerService.hide();
    })
      
  }


  getIgst(){
     this.tax.TAX_IGST=parseFloat(this.tax.TAX_SGST)+parseFloat(this.tax.TAX_CGST);
  }


}
 