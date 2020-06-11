import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
declare var jQuery: any;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  party:any=[];
  partyBatch=[];
  dispatchID=[];
  dispatchbatch=[];
  batchData=[];
  processData=[];
  othrchrgeData=[];
  processMainData=[];
  isValid:boolean=true;
  batchforproc:string='';
  mtrforproc:number=0;
  isAdd:boolean=false;
  othrrate:any=[];
  othrchrtyp:boolean=false;
  invoice:any={
    totalMtr:0.00,
    totalpcs:0.00,
    totalbatamt:0.00,
    totaleproamt:0.00,
    totalbatprocamt:0.00,
    totalothchrg:0.00,
    totamtwotxt:0.00,
    totalamt:0.00,
    taxtyp:'',
    sgst:0.00,
    cgst:0.00,
    igst:0.00,
    totTax:0.00,
    disp:0.00,
    disAmt:0.00,
    totalamtwithdis:0.00,
    roundoff:0.00,
    finalamt:0.00,
    taxp:5.00
  };
  proc:any;
  batch:any;
  invNoList:any=[];
  othrchrgAdd:boolean=false;
  particular : any = {
    batch:"",
    procssName:"",
    pcs:0,
    mtr:0,
    rate:0
  };
  addprocesdata:any={
    rate1:0
  }
  othrChrge:any={
    chrgtyp:"AMOUNT",
    rate2:0
  }
  addproces:any={};
  update:boolean;
  deleteright:boolean;
  formrights:any=[];
  isSaving:boolean=false;
  constructor(public ds : DataServiceService,private router:Router,private datePipe: DatePipe, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) {
    this.formrights  = ds.Roles.filter(Role => Role.USR_RLINK == 'invoice');
    this.deleteright=this.formrights[0].USR_DEL;
    this.invoice.JDate=new Date();
		  this.invoice.LRDate=new Date();
		  route.params.subscribe(params => {
			  if(!params.id){
            this.getId();
        }else{
          this.spinnerService.show();
          this.ds.getData('/sicretrieve',params.id).then((data:any) => {
            this.invoice=data.recordsets[0][0];
            this.invoice.JDate=new Date(data.recordsets[0][0].JDate);
            this.invoice.LRDate=new Date(data.recordsets[0][0].LRDate);
            this.batchData=data.recordsets[1];
            this.processMainData=data.recordsets[2];
            this.othrrate=data.recordsets[3];
            this.isValid=false;
            this.invoice.invNo = data.recordset[0].id|| [];
            this.spinnerService.hide();
          },err => {
              console.log(err);
              this.spinnerService.hide();
          })
        }
      });
   }

  ngOnInit() {
  }

  getPartyDet(){
    this.invoice.PM_ID= jQuery('.selectpicker').find("option:selected").val();
    this.invoice.PM_NAME= jQuery('.selectpicker').find("option:selected").text();
    this.getdiptId(this.invoice);
  }

  getId(){
    this.spinnerService.show();
    this.ds.getData('/InvoiceId').then((data:any) => {
      // console.log(data);
      this.invoice.invNo = data.recordset[0].id|| [];
      this.getParty();
      this.spinnerService.hide();
    },err => {
        console.log(err);
        this.spinnerService.hide();
    })
  }
  getParty(){
    this.spinnerService.show();
    this.ds.getData('/GreyParty','Vendor').then((data:any) => {
      this.party = data.recordset|| [];
      this.party  = this.party.filter(party1 => party1.PM_PTYP == 'Grey Material');
      jQuery('.selectpicker').selectpicker();	
      this.invoice.process="PD";
      this.spinnerService.hide();
    },err => {
        console.log(err);
        this.spinnerService.hide();
    })
  }
  getdiptId(det){
    this.spinnerService.show();
    this.ds.getData('/disptchId',det.PM_NAME).then((data:any) => {
      this.dispatchID=data.recordset;
      this.invoice.taxtyp=data.recordsets[1][0].taxtype
      this.invNoList=data.recordsets[2];
      this.invNoList = this.invNoList.map(a => a.SI_InvNo);
      this.spinnerService.hide();
    },err => {
        console.log(err);
        this.spinnerService.hide();
    })
  }
  getBatch(det){
    this.spinnerService.show();
    this.ds.getData('/disptchBatch',det).then((data:any) => {
      this.dispatchbatch=data.recordset;
      this.invoice.transport=data.recordset[0].transport;
 
      this.getInvProcess();
      this.spinnerService.hide();
    },err => {
        console.log(err);
        this.spinnerService.hide();
    })
  }
  getdetail(det){
    this.invoice.batch=det;
    this.ds.getData('/dispatchbatchdetails',this.invoice).then((data:any) => {
      this.particular.procssName=data.recordset[0].prcName;
      this.particular.pcs=data.recordset[0].tpcs;
      this.particular.mtr=data.recordset[0].mtr;
      this.spinnerService.hide();
    },err => {
        console.log(err);
        this.spinnerService.hide();
    })
  }
  delete(){
    this.ds.getData('/invdelte',this.invoice.id).then((data:any) => {
      this.invoice={
        totalMtr:0.00,
        totalpcs:0.00,
        totalbatamt:0.00,
        totaleproamt:0.00,
        totalbatprocamt:0.00,
        totalothchrg:0.00,
        totamtwotxt:0.00,
        totalamt:0.00,
        taxtyp:'',
        sgst:0.00,
        cgst:0.00,
        igst:0.00,
        totTax:0.00,
        disp:0.00,
        disAmt:0,
        totalamtwithdis:0.00,
        roundoff:0.00,
        finalamt:0.00
    };
    this.invoice.JDate=new Date();
    this.invoice.LRDate=new Date();
    this.batchData=[];this.processMainData=[];this.othrrate=[];
    this.particular={
      batch:"",
      procssName:"",
      pcs:0,
      mtr:0,
      rate:0
    };
    this.addprocesdata={};
    this.othrChrge={};
    this.invoice.batchData=[];
    this.isValid=true;
    this.batchforproc='';
    this.mtrforproc=0;
    this.isAdd=false;
    setTimeout(function () {
      jQuery(".selectpicker").selectpicker("refresh");
      jQuery('.selectpicker').selectpicker();
    }, 250);
    this.othrchrtyp=false;
    this.othrchrgAdd=false;
    this.invoice.addprocesdata=[];
    this.invoice.othrrate=[];
    this.isSaving=false;
    // this.ds.submittedMessage = "Form Submitted Successfully.";
    swal("Deleted!", "Invoice DELETED", "success");
    this.getId();
       },err => {
      console.log(err);
    })
  }
  getInvProcess(){
    this.ds.getData('/InvoiceProcess').then((data:any) => {
      this.processData=data.recordset;
      this.othrchrgeData=data.recordsets[1];
      this.spinnerService.hide();
    },err => {
        console.log(err);
        this.spinnerService.hide();
    })
  }

  addParticular(particular){
		if(particular.batch=="" || typeof(particular.batch)=="undefined"){
     // alert("Please Select Item");
      swal("Error!", "Please Select Item!", "error");
		}else if(particular.pcs==0 || particular.mtr==0){
     //alert("Not Valid Pcs & MTR");
     swal("Error!", "Not Valid Pcs & MTR!", "error");
    }else{
    this.isAdd=true;
    setTimeout(function () {
      jQuery(".selectpicker").selectpicker("refresh");
      jQuery('.selectpicker').selectpicker();
    }, 250);
    this.particular.amt=parseFloat(this.particular.mtr)*parseFloat(this.particular.rate);
    let item = this.particular;
    this.batchforproc=this.particular.batch;
    this.mtrforproc=this.particular.mtr
		this.particular={ rate:0,pcs:0,mtr:0};
    this.batchData.push(item);
    this.calculation();
		// this.calculateTotal(this.invoice);
		}
  }
  removeParticular(index){
    this.batchData.splice(index, 1);
    this.calculation();
    if(this.batchData.length<=0){
      this.isAdd=false;
      setTimeout(function () {
        jQuery(".selectpicker").selectpicker("refresh");
        jQuery('.selectpicker').selectpicker();
      }, 250);
    }
  }
    removeProcParticular(index){
      this.processMainData.splice(index, 1);
      this.calculation();
    }
    removeothchrge(index){
        this.othrrate.splice(index,1);
        if(this.othrrate.length<=0){
          this.othrchrgAdd=false;
        }
        this.calculation();
    }
  adProcess(procdata){
    this.addprocesdata.batch=this.batchforproc;
    this.addprocesdata.mtr=this.mtrforproc
    this.addprocesdata.amt=parseFloat(this.addprocesdata.mtr)*parseFloat(this.addprocesdata.rate1);
		if(procdata.PR_ID=="" || procdata.PR_NM=="" || typeof(procdata.PR_NM)=="undefined" || typeof(procdata.PR_ID)=="undefined"){
      //alert("Please Select Process");
      swal("Error!", "Please Select Process!", "error");
    }else if(this.addprocesdata.batch==""){
      //alert("Please Select Batch");
      swal("Error!", "Please Select Batch!", "error");
    }else if(this.addprocesdata.rate1<=0){
     // alert("Please insert correct reate");
      swal("Error!", "Please Insert correct rate!", "error");
    }else{
		let item = this.addprocesdata;
		this.addprocesdata={ rate1:0 };
    this.processMainData.push(item);
    this.calculation();
    // console.log(this.processMainData);
		// this.calculateTotal(this.invoice);
		}
  }
  othrchrgechange(typ){
       if(typ=="MTR"){
          this.othrchrtyp=true;
       }else{
        this.othrchrtyp=false;
       }
  }
  othrCharges(othrChrge){ 
    if(this.othrchrtyp==true){
        othrChrge.amt= parseFloat(this.invoice.totalMtr)*parseFloat(othrChrge.rate2);
    }else{
      othrChrge.amt= parseFloat(othrChrge.rate2);
    }
    if(this.othrChrge.rate2<=0){
     // alert("Please insert correct rate");
      swal("Error!", "Please Insert correct rate!", "error");
    }else{
    this.othrchrgAdd=true;
    let item = this.othrChrge;
		this.othrChrge={ rate2:0,chrgtyp:item.chrgtyp };
    this.othrrate.push(item);
    this.calculation();
    }
  }
  calculation(){
    let sumprocmtr=this.verticalSum(this.batchData,"mtr");
    let sumprocpcs=this.verticalSum(this.batchData,"pcs");
    let sumprocamt=this.verticalSum(this.batchData,"amt");
    let sumbatamt=this.verticalSum(this.processMainData,"amt");
    let othrcharamt=this.verticalSum(this.othrrate,"amt");
    this.invoice.totalMtr=parseFloat(sumprocmtr);
    this.invoice.totalpcs=parseFloat(sumprocpcs);
    this.invoice.totalbatamt=parseFloat(sumprocamt);
    this.invoice.totaleproamt=parseFloat(sumbatamt);
    this.invoice.totalothchrg=parseFloat(othrcharamt);
    this.invoice.totalbatprocamt=parseFloat(sumprocamt)+parseFloat(sumbatamt);
    this.invoice.disp=parseFloat(this.invoice.disp);
    this.invoice.disAmt=(parseFloat(this.invoice.totalbatprocamt)*parseFloat(this.invoice.disp))/100;
    this.invoice.totamtwotxt=((parseFloat(sumprocamt)+parseFloat(sumbatamt))-parseFloat(this.invoice.disAmt))+parseFloat(othrcharamt);  
    this.invoice.totalamtwithdis=(parseFloat(sumprocamt)+parseFloat(sumbatamt))-parseFloat(this.invoice.disAmt);
    if(this.invoice.taxtyp=='sgst'){
      this.invoice.totTax=(parseFloat(this.invoice.totamtwotxt)*parseFloat(this.invoice.taxp))/100;
      this.invoice.sgst=parseFloat(this.invoice.totTax)/2;
      this.invoice.cgst=parseFloat(this.invoice.totTax)/2
      this.invoice.totalamt=((parseFloat(sumprocamt)+parseFloat(sumbatamt))-parseFloat(this.invoice.disAmt))+parseFloat(othrcharamt)+parseFloat(this.invoice.totTax);
      this.invoice.finalamt=Math.round(this.invoice.totalamt)
      this.invoice.roundoff=(parseFloat(this.invoice.finalamt)-parseFloat(this.invoice.totalamt)).toFixed(2);
 
    }else if(this.invoice.taxtyp=='igst'){
      this.invoice.totTax=(parseFloat(this.invoice.totamtwotxt)*parseFloat(this.invoice.taxp))/100;
      this.invoice.igst=parseFloat(this.invoice.totTax);
      this.invoice.totalamt=((parseFloat(sumprocamt)+parseFloat(sumbatamt))-parseFloat(this.invoice.disAmt))+parseFloat(othrcharamt)+parseFloat(this.invoice.totTax);
      this.invoice.finalamt=Math.round(this.invoice.totalamt)
      this.invoice.roundoff=(parseFloat(this.invoice.finalamt)-parseFloat(this.invoice.totalamt)).toFixed(2);
    }else{
      this.invoice.totTax=0;
      this.invoice.totalamt=((parseFloat(sumprocamt)+parseFloat(sumbatamt))-parseFloat(this.invoice.disAmt))+parseFloat(othrcharamt);
      this.invoice.finalamt=Math.round(this.invoice.totalamt)
      this.invoice.roundoff=(parseFloat(this.invoice.finalamt)-parseFloat(this.invoice.totalamt)).toFixed(2);
    }
  }
  discount(){
    if(this.invoice.totamtwotxt=="" || typeof(this.invoice.totamtwotxt)==undefined){
        alert("Amount is not blank");
       
    }else{
      let amt=this.invoice.totamtwotxt;
      let disp=this.invoice.disp;
      let disAmt=(parseFloat(amt)*parseFloat(disp))/100;
      this.invoice.disAmt=disAmt;
      this.invoice.totalamtwithdis=parseFloat(this.invoice.totalbatprocamt)-disAmt;
      this.calculation();
    }
   
  }

  verticalSum(array, colname){
		let total = 0;
		array.forEach(item => {
			total += Number(item[colname]);
		});
		return total.toFixed(2);
	}
	saveForm(formName,input){
    let char=input.invNo.trim();
    input.invNo=char;
    let count;
    if(char.charAt(0)=="0"){
        let val=char.slice(1);
        count=this.invNoList.findIndex(x => x.toLowerCase() == val.toLowerCase());
        input.invNo=val;
      }else{
        count=this.invNoList.findIndex(x => x.toLowerCase() == input.invNo.toLowerCase());
      }
		if(count!=-1){
			swal("Error!", "Invoice No Already Exist!!", "error");
		}else{
    this.isSaving=true;
      input.batchData=this.batchData;
      input.addprocesdata=this.processMainData;
      input.othrrate=this.othrrate;
      this.invoice.JDate = this.datePipe.transform(this.invoice.JDate, 'yyyy-MM-dd');
      this.invoice.LRDate = this.datePipe.transform(this.invoice.LRDate, 'yyyy-MM-dd');
		this.ds.postData('/InvoiceInsert', input).then((data:any) => {
				this.ds.formSubmitted = true;
				formName.resetForm();
				this.invoice={
            totalMtr:0.00,
            totalpcs:0.00,
            totalbatamt:0.00,
            totaleproamt:0.00,
            totalbatprocamt:0.00,
            totalothchrg:0.00,
            totamtwotxt:0.00,
            totalamt:0.00,
            taxtyp:'',
            sgst:0.00,
            cgst:0.00,
            igst:0.00,
            totTax:0.00,
            disp:0.00,
            disAmt:0.00,
            totalamtwithdis:0.00,
            roundoff:0.00,
            finalamt:0.00
        };
				this.invoice.JDate=new Date();
        this.invoice.LRDate=new Date();
        this.batchData=[];this.processMainData=[];this.othrrate=[];
        this.particular={
          batch:"",
          procssName:"",
          pcs:0,
          mtr:0,
          rate:0
        };
        this.addprocesdata={};
        this.othrChrge={};
        this.invoice.batchData=[];
        this.isValid=true;
        this.batchforproc='';
        this.mtrforproc=0;
        this.isAdd=false;
        setTimeout(function () {
          jQuery(".selectpicker").selectpicker("refresh");
          jQuery('.selectpicker').selectpicker();
        }, 250);
        this.othrchrtyp=false;
        this.othrchrgAdd=false;
        this.invoice.addprocesdata=[];
        this.invoice.othrrate=[];
        this.isSaving=false;
        // this.ds.submittedMessage = "Form Submitted Successfully.";
        swal("Success!", "Data Saved Successfully!", "success");
        this.getId();
				this.spinnerService.hide();
			},err => {
				err = err.json();
				this.ds.invalidForm = true;
				this.ds.errorMessage = err.error.message;
				console.log(err);
			})
		}
  }
  reset(){
    this.invoice={
      totalMtr:0.00,
      totalpcs:0.00,
      totalbatamt:0.00,
      totaleproamt:0.00,
      totalbatprocamt:0.00,
      totalothchrg:0.00,
      totamtwotxt:0.00,
      totalamt:0.00,
      taxtyp:'',
      sgst:0.00,
      cgst:0.00,
      igst:0.00,
      totTax:0.00,
      disp:0.00,
      disAmt:0.00,
      totalamtwithdis:0.00,
      roundoff:0.00,
      finalamt:0.00
  };
  this.invoice.JDate=new Date();
  this.invoice.LRDate=new Date();
  this.batchData=[];this.processMainData=[];this.othrrate=[];
  this.particular={
    batch:"",
    procssName:"",
    pcs:0,
    mtr:0,
    rate:0
  };
  this.addprocesdata={};
  this.othrChrge={};
  this.invoice.batchData=[];
  this.isValid=true;
  this.batchforproc='';
  this.mtrforproc=0;
  this.isAdd=false;
  setTimeout(function () {
    jQuery(".selectpicker").selectpicker("refresh");
    jQuery('.selectpicker').selectpicker();
  }, 250);
  this.othrchrtyp=false;
  this.othrchrgAdd=false;
  this.invoice.addprocesdata=[];
  this.invoice.othrrate=[];
  this.isSaving=false;
  // this.ds.submittedMessage = "Form Submitted Successfully.";
  swal("Cleared!", "Form Reset", "info");
  this.getId();

  }	
}
