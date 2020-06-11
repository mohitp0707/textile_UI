import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
declare var jQuery: any;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-intake-jcard',
  templateUrl: './intake-jcard.component.html',
  styleUrls: ['./intake-jcard.component.scss']
})
export class IntakeJcardComponent implements OnInit {

  partyBatch:any=[];
  invoice:any={
    JIDate:""
  };
  RecQtyList:any=[];
  isSaving:boolean=false;
  

  constructor(public ds : DataServiceService,private spinnerService: Ng4LoadingSpinnerService,private datePipe: DatePipe) {
          this.jobcardbatch();
          this.invoice.JIDate=new Date();
   }

   jobcardbatch(){
    this.spinnerService.show();
    this.ds.getData('/JobCardIntakeBatch').then((data:any) => {
      this.partyBatch = data.recordset|| [];
     // console.log(this.partyBatch);
      jQuery('.selectpicker').selectpicker();
      //jQuery('.selectpicker').selectpicker('refresh');

      this.spinnerService.hide();
      },err => {
      console.log(err);
      this.spinnerService.hide();
    })
   }

   getDet(){
    this.invoice.JBC_JBatch= jQuery('.selectpicker').find("option:selected").val();
    console.log(this.invoice.JBC_JBatch);
		this.getJobDetail(this.invoice.JBC_JBatch);
   }

   getJobDetail(batch){
    this.spinnerService.show();
        this.ds.getData('/JobCardDetails',batch).then((data:any) => {
              this.invoice=data.recordsets[0][0];
              this.invoice.JIDate=new Date();
              this.invoice.JBC_JBatch=batch;
              this.RecQtyList=data.recordsets[1];
              this.spinnerService.hide();
        },err => {
            console.log(err);
            this.spinnerService.hide();
        })

   }
   saveForm(frm,value){
    this.isSaving=true;
    this.invoice.RecQtyList=this.RecQtyList;
      this.spinnerService.show();
      this.invoice.JIDate = this.datePipe.transform(this.invoice.JIDate, 'yyyy-MM-dd');
          this.ds.postData('/JobIntake_Insert', this.invoice).then((data:any) => {
            // var indexpos = this.partyBatch.findIndex(x =>x.JBC_JBatch == this.invoice.JBC_JBatch);
            // this.partyBatch.splice(indexpos, 1);
            // jQuery('.selectpicker').selectpicker();
          this.invoice={};
          this.invoice.JIDate=new Date();
          this.RecQtyList=[];
        //  frm.resetForm();
        setTimeout(function () {
          jQuery('.selectpicker option:selected').remove();
          jQuery(".selectpicker").val('').selectpicker("refresh")
          }, 250);
          swal("Success!", "Data Saved Successfully!", "success");
          // this.ds.formSubmitted = true;
          this.isSaving=false;
         // this.jobcardbatch();
          this.spinnerService.hide();
      },err => {
          err = err.json();
          this.ds.invalidForm = true;
          this.ds.errorMessage = err.error.message;
          this.isSaving=false;
          console.log(err);
        this.spinnerService.hide();
    })
   }
   reset(){
    this.invoice={};
    this.invoice.JIDate=new Date();
    this.RecQtyList=[];
  //  frm.resetForm();
    setTimeout(function () {
    jQuery('.selectpicker option:selected').remove();
    jQuery(".selectpicker").val('').selectpicker("refresh")
    }, 250);
     this.isSaving=false;
     swal("Cleared!", "Form Reset", "info");
   }

  ngOnInit() {
  }

}
