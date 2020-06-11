import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-electricconsumption',
  templateUrl: './electricconsumption.component.html',
  styleUrls: ['./electricconsumption.component.scss']
})
export class ElectricconsumptionComponent implements OnInit {

  isValid:boolean=true;
  daycountEntry:number=0;
  emplist:any=[];
  invoice:any={ 
    GR_Date:""
   };

  constructor(public ds : DataServiceService,private datePipe: DatePipe, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService,config: NgbDatepickerConfig) {
    const currentDate = new Date();

    config.minDate = {year:currentDate.getFullYear(), month:currentDate.getMonth()+1, day: currentDate.getDate()};
    config.maxDate = {year:currentDate.getFullYear(), month:currentDate.getMonth()+1, day: currentDate.getDate()};

    config.outsideDays = 'hidden';
    route.params.subscribe(params => {
      if(!params.id){
        this.invoice.GR_Date=new Date();
        this.spinnerService.show();
        this.getPreviousData();
      }
      else
      {
        ds.getData('/electrview/'+params.id).then((data:any) => {
          this.spinnerService.show();
          if(!data){
            this.ds.invalidForm = true;
            this.ds.errorMessage = "No data found.";
            this.spinnerService.hide();
            return ;
          }
          this.isValid=false;
          this.invoice=data.recordset[0];
          this.invoice.GR_Date=new Date(data.recordset[0].dat);
          this.getPreviousData();
          this.spinnerService.hide();
        },err => {
          this.ds.invalidForm = true;
          this.ds.errorMessage = "No data found.";
          this.spinnerService.hide();
          console.log(err);
        });
      }
   })   }

   getPreviousData(){
    this.ds.getData('/elecprvdata').then((data:any) => {
      if(data.recordset.length<=0){
        this.invoice.pkw=0;
        this.invoice.pkva=0;
       
      }else{
        this.invoice.pkw = data.recordset[0].pkw;
        this.invoice.pkva = data.recordset[0].pkva;
        
      }  
      this.getEmploye();
      this.spinnerService.hide();
    },err => {
        console.log(err);
        this.spinnerService.hide();
    })
   }

   getEmploye(){
    this.ds.getData('/employee').then((data:any) => {
      this.emplist = data.recordset|| [];
      this.daycount();
      this.spinnerService.hide();
    },err => {
        console.log(err);
        this.spinnerService.hide();
    })
   }
   update(formName,input){
 
    this.spinnerService.show();
    if(formName.invalid==true){
        //alert("Please fill require filled");
      swal("Error!", "Please fill require filled!!", "error");
      this.spinnerService.hide();
    }else{
      input.GR_Date = this.datePipe.transform(this.invoice.GR_Date, 'yyyy-MM-dd');
    this.ds.postData('/WATERREDINGUPDATE', input).then((data:any) => {
        this.ds.formSubmitted = true;
        formName.resetForm();
        this.invoice={};
        this.invoice.GR_Date=new Date();
        this.ds.submittedMessage = "Form Submitted Successfully.";
        this.spinnerService.hide();
      },err => {
        err = err.json();
        this.ds.invalidForm = true;
        this.ds.errorMessage = err.error.message;
        console.log(err);
      })
    }    
   }
   daycount(){
    this.ds.getData('/eleccount').then((data:any) => {
     this.daycountEntry = data.recordset[0].cnt|| [];
      this.spinnerService.hide();
    },err => {
        console.log(err);
        this.spinnerService.hide();
    })
   }
   saveForm(formName,input){


    this.route.params.subscribe(params => {
      if(!params.id){
    this.spinnerService.show();
    if(formName.invalid==true){
      //alert("Please fill require filled");
      swal("Error!", "Please fill require filled!!", "error");
      this.spinnerService.hide();
    }else if(this.daycountEntry>0) {
      //alert("Date Entry already done");
      swal("Error!", "Date Entry already done!!", "error");
    }
    else{
      input.GR_Date = this.datePipe.transform(this.invoice.GR_Date, 'yyyy-MM-dd');
    this.ds.postData('/ElectInsert', input).then((data:any) => {
        this.ds.formSubmitted = true;
        formName.resetForm();
        this.invoice={};
        this.invoice.GR_Date=new Date();
        this.ds.submittedMessage = "Form Submitted Successfully.";
        this.spinnerService.hide();
      },err => {
        err = err.json();
        this.ds.invalidForm = true;
        this.ds.errorMessage = err.error.message;
        console.log(err);
        
      })
    }}else{
     // alert("can not update Transaction Entry");
      swal("Error!", "can not update Transaction Entry!!", "error");
    }
  });}
  reset(){
    this.invoice={};
    this.invoice.GR_Date=new Date();
    swal("Cleared!", "Form Reset!", "info");
  }

  ngOnInit() {
  }


}
