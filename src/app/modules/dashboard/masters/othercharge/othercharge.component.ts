import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner'; 
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-othercharge',
  templateUrl: './othercharge.component.html',
  styleUrls: ['./othercharge.component.scss']
})
export class OtherchargeComponent implements OnInit {

  proc:any={
    name:"",
    procname:""
  };
  editable2:number;
  nametab:any=[];
  retname:any=[];
  editable:number;

  nametabproc:any=[];
  retnametab:any=[];
  datacountname:boolean=false;
  datacount:boolean=false;
  constructor(public ds : DataServiceService,private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getretrivedata();
  }
  addprocname(){
    console.log(this.proc.Proc_name);
    if(this.proc.Proc_name=="" || typeof(this.proc.Proc_name)=="undefined"){
        //alert("Please Insert Process Name");
        swal("Error!", "Please Insert Other Charge Name!!", "error");
    }else{
      let itemt=this.proc;
      this.datacount=true;
      this.nametab.push(itemt);
       this.proc={};
    }
  }

  addinvprocpname(){
    console.log(this.proc.procname);
    if(this.proc.procname=="" || typeof(this.proc.procname)=="undefined"){
        //alert("Please Insert Process Name");
        swal("Error!", "Please Insert Process Name!!", "error");
    }else{
      let itemt=this.proc;
      this.datacountname=true;
      this.nametabproc.push(itemt);
       this.proc={};
    }
  }

  removprocnameproc(ind){
    this.nametabproc.splice(ind,1);
    if(this.nametabproc.length<=0){
      this.datacountname=false;
    }
  }

  removprocname(ind){
    this.nametab.splice(ind,1);
    if(this.nametab.length<=0){
      this.datacount=false;
    }
  }
  saveprocname(){
    this.ds.postData('/othChargeInsert', this.nametab).then((data:any) => {
      this.ds.formSubmitted = true;
      this.nametab=[];
      this.datacount=false;
      //alert("Save Successfully");
      swal("Success", "Save Successfully", "success");
     this.getretrivedata();
      this.ds.submittedMessage = "Form Submitted Successfully.";
      this.spinnerService.hide();
    },err => {
      err = err.json();
      this.ds.invalidForm = true;
      this.ds.errorMessage = err.error.message;
      console.log(err);
    })
  }

  saveprocnamename(){
    this.ds.postData('/InvProcInsert', this.nametabproc).then((data:any) => {
      this.ds.formSubmitted = true;
      this.nametabproc=[];
      this.datacountname=false;
      //alert("Save Successfully");
      swal("Success", "Save Successfully", "success");
    
      this.getretrivedata();
      this.ds.submittedMessage = "Form Submitted Successfully.";
      this.spinnerService.hide();
    },err => {
      err = err.json();
      this.ds.invalidForm = true;
      this.ds.errorMessage = err.error.message;
      console.log(err);
    })
  }
  submitForm(a,b){
    
  }
  
  getretrivedata(){
    this.ds.getData('/othchrgeRet').then((data:any) => {
      console.log(data);
      this.retname = data.recordset;
      this.retnametab=data.recordsets[1];
      this.spinnerService.hide();
    },err => {
        console.log(err);
        this.spinnerService.hide();
    })
  }
  editprocname(i){
    this.editable=i;
  }
  editprocname2(i){
    this.editable2=i;
  }
  saveeditprocname(item){
    if(item.name=="" || item.name==undefined){
      //alert("Please Insert name");
      swal("Errror!", "Please Insert name", "error");
    }else{
      this.spinnerService.show();
        this.ds.postData('/othrchrgedit',item).then((data:any) => {
          this.editable=100;
          //alert("edit Successfully");
          swal("Success", "Edit Successfully", "success");
          this.getretrivedata();
          this.spinnerService.hide();
        },err => {
        err = err.json();
        this.ds.invalidForm = true;
        this.ds.errorMessage = err.error.message;
        console.log(err);
      })
    }
  }

  saveeditprocnamename(item){
    if(item.name=="" || item.name==undefined){
      //alert("Please Insert name");
      swal("Errror!", "Please Insert name", "error");
    }else{
      this.spinnerService.show();
        this.ds.postData('/invProcedit',item).then((data:any) => {
          this.editable2=100;
          //alert("edit Successfully");
          swal("Success", "Edit Successfully", "success");
          this.getretrivedata();
          this.spinnerService.hide();
        },err => {
        err = err.json();
        this.ds.invalidForm = true;
        this.ds.errorMessage = err.error.message;
        console.log(err);
      })
    }
  }
}
