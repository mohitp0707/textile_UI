import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-water-reading',
  templateUrl: './water-reading.component.html',
  styleUrls: ['./water-reading.component.scss']
})
export class WaterReadingComponent implements OnInit {

  isValid:boolean=true;
  issave:boolean=true;
  emplist:any=[];
  invoice:any={
    total:0,
    RecQtyList:[],
    Tqty:0
  };

  constructor(public ds : DataServiceService,private datePipe: DatePipe, public route : ActivatedRoute,private router:Router,private spinnerService: Ng4LoadingSpinnerService) {
    route.params.subscribe(params => {
      if(!params.id){
        this.invoice.JDate=new Date();
        this.spinnerService.show();
        this. getPrevred();
      }
      else
      {
        ds.getData('/waterReadview/'+params.id).then((data:any) => {
          this.spinnerService.show();
          if(!data){
            this.ds.invalidForm = true;
            this.ds.errorMessage = "No data found.";
            this.spinnerService.hide();
            return ;
          }
          // this.isValid=false;
          this.issave=false;
          this.invoice=data.recordset[0];
          this.invoice.JDate=new Date(data.recordset[0].dat);
          this. getPrevred();
          this.spinnerService.hide();
        },err => {
          this.ds.invalidForm = true;
          this.ds.errorMessage = "No data found.";
          this.spinnerService.hide();
          console.log(err);
        });
      }
   })   }

   getPrevred(){
    this.ds.getData('/waterprvreding').then((data:any) => {
      if(data.recordset.length<=0){
        this.invoice.readout=0;
      }else{
      this.invoice.readout = data.recordset[0].prin;
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
      this.spinnerService.hide();
    },err => {
        console.log(err);
        this.spinnerService.hide();
    })
   }
   update(formName,input){
    // alert("can't update entry");
     swal("Error!", "Can't update entry!!", "error");
    // this.spinnerService.show();
    // if(formName.invalid==true){
    //   alert("Please fill require filled");
    //   this.spinnerService.hide();
    // }else{
    // this.ds.postData('/WATERREDINGUPDATE', input).then((data:any) => {
    //     this.ds.formSubmitted = true;
    //     formName.resetForm();
    //     this.invoice={};
    //     this.invoice.GR_Date=new Date();
    //     this.ds.submittedMessage = "Form Submitted Successfully.";
    //     this.spinnerService.hide();
    //   },err => {
    //     err = err.json();
    //     this.ds.invalidForm = true;
    //     this.ds.errorMessage = err.error.message;
    //     console.log(err);
    //   })
    // }    
   }
   saveForm(formName,input){

    this.route.params.subscribe(params => {
      if(!params.id){
    this.spinnerService.show();
    if(formName.invalid==true){
      //alert("Please fill require filled");
      swal("Error!", "Please fill require filled!!", "error");
      this.spinnerService.hide();
    }else{
      input.GR_Date = this.datePipe.transform(this.invoice.GR_Date, 'yyyy-MM-dd');
      input.JDate = this.datePipe.transform(this.invoice.JDate, 'yyyy-MM-dd');
    this.ds.postData('/WATERREDINGINSERT', input).then((data:any) => {
        this.ds.formSubmitted = true;
        formName.resetForm();
        this.invoice={};
        this.invoice.JDate=new Date();
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
      swal("Error!", "Can not update Transaction Entry!!", "error");
    }
  });}

  reset(){
    this.invoice={};
    this.invoice.JDate=new Date();
    this.invoice.GR_Date=new Date();
    swal("Cleared!", "Form Reset!", "info");
  }

  ngOnInit() {
  }

}
