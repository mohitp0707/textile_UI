import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner'; 
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

  procename:boolean=false;
  procnamea:any=[];
  proctyp:boolean=false;
  proctypa:any=[];
  costfreeproc:boolean=false;
  costfreeproca:any=[];
  proc:any={
    Proc_name:"",
    Proc_typ:"",
    Proc_wocost:""
  };
  proc1:any;
  proc2:any;
  procNameRet:any=[];
  procTypRet:any=[];
  costTypRet:any=[];
  editable:number;
  editable1:number;
  editable2:number;

  constructor(public ds : DataServiceService,private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getretrivedata();
  }

  addprocname(){
    console.log(this.proc.Proc_name);
    if(this.proc.Proc_name==""){
        //alert("Please Insert Process Name");
        swal("Error!", "Please Insert Process Name!!", "error");
    }else{
      this.procename=true;
      let itemt=this.proc;
      this.procnamea.push(itemt);
       this.proc={};
    }
  }
  addproctyp(){
    if(this.proc.Proc_typ==""){
      //alert("Please Insert TYPE");
      swal("Error!", "Please Insert TYPE!!", "error");
  }else{
    this.proctyp=true;
    let itemt=this.proc;
    this.proctypa.push(itemt);
     this.proc={};
    }
  }
addproccostfree(){
  if(this.proc.Proc_wocost==""){
   // alert("Please Insert TYPE(FIXED COST)");
    swal("Error!", "Please Insert TYPE(FIXED COST)", "error");
}else{
  this.costfreeproc=true;
  let itemt=this.proc;
  this.costfreeproca.push(itemt);
   this.proc={};
  }
}
submitForm(a,b){

}
removprocname(ind){
  this.procnamea.splice(ind,1);
  if(this.procnamea.length<=0){
    this.procename=false;
  }
}
removproctyp(ind){
  this.proctypa.splice(ind,1);
  if(this.proctypa.length<=0){
    this.proctyp=false;
  }
}

removcostfree(ind){
  this.costfreeproca.splice(ind,1);
  if(this.costfreeproca.length<=0){
    this.costfreeproc=false;
  }
}

saveprowocost(){
  this.ds.postData('/costfreeProcInert', this.costfreeproca).then((data:any) => {
    this.ds.formSubmitted = true;
    this.costfreeproca=[];
    this.costfreeproc=false;
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
saveprocname(){
    this.ds.postData('/procNameInsert', this.procnamea).then((data:any) => {
      this.ds.formSubmitted = true;
      this.procnamea=[];
      this.procename=false;
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
saveproctyp(){
  this.ds.postData('/procTypeInsert', this.proctypa).then((data:any) => {
    this.ds.formSubmitted = true;
    this.proctypa=[];
    this.proctyp=false;
   // alert("Save Successfully");
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
getretrivedata(){
  this.ds.getData('/procRetrieve').then((data:any) => {
    this.procNameRet = data.recordsets[0]|| [];
    this.procTypRet =  data.recordsets[1]|| [];
    this.costTypRet =  data.recordsets[2]|| [];
    this.spinnerService.hide();
  },err => {
      console.log(err);
      this.spinnerService.hide();
  })
}

editprocname(i){
  this.editable=i;
}
editproctyp(i){
  this.editable1=i;
}
editcostfreeproc(i){
  this.editable2=i;
}
savcostfproc(item){
  if(item.name=="" || item.name==undefined){
     // alert("Please Insert name");
      swal("Errror!", "Please Insert name", "error");
  }else{
  this.spinnerService.show();
  this.ds.postData('/editcostfreeproc',item).then((data:any) => {
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
saveditproctyp(item){
  if(item.name=="" || item.name==undefined){
   // alert("Please Insert name");
   swal("Errror!", "Please Insert name", "error");
  }else{
    this.spinnerService.show();
     this.ds.postData('/proctypeedit',item).then((data:any) => {
        this.editable1=100;
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
saveeditprocname(item){
  if(item.name=="" || item.name==undefined){
    //alert("Please Insert name");
    swal("Errror!", "Please Insert name", "error");
  }else{
    this.spinnerService.show();
      this.ds.postData('/pronameedit',item).then((data:any) => {
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

updateSatusprocname(item){
  this.spinnerService.show();
  this.ds.postData('/pronametypeedit',item).then((data:any) => {
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
updatStatuscostEffect(item){
  this.spinnerService.show();
  this.ds.postData('/proctypestatusedit',item).then((data:any) => {
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
updatStatuscostFixed(item){
  this.spinnerService.show();
  this.ds.postData('/editcostfreeStatusproc',item).then((data:any) => {
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
