import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
declare var jQuery: any;
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.scss']
})
export class DispatchComponent implements OnInit {

  party:any=[];
  partyBatch=[];
  isValid:boolean=true;
  invoice:any={
		GR_Batch:"",
		JDate:""

  };
  selectedItems = [];
  dropdownList = [];
  emplist:any=[];
  tableArray:any=[];
  transport:any=[];
  isAdd:boolean=false;
  isSaving:boolean=false;

  constructor(public ds : DataServiceService,private datePipe: DatePipe, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService)  {
     route.params.subscribe(params => {
      if(!params.id){
        this.spinnerService.show();
      this.invoice.JDate=new Date();
      this.ds.getData('/GreyParty','Vendor').then((data:any) => {
            this.party = data.recordset|| [];
            jQuery('.selectpicker').selectpicker();	
            this.getEmployee();
          },err => {
              console.log(err);
              this.spinnerService.hide();
          })
        }else{
          ds.getData('/disptachRetrieve/'+params.id).then((data:any) => {
            this.spinnerService.show();
            if(!data){
              this.ds.invalidForm = true;
              this.ds.errorMessage = "No data found.";
              this.spinnerService.hide();
              return ;
            }
            console.log(data.recordsets[0][0].dat);
            this.isValid=false;
            this.invoice=data.recordsets[0][0];
            this.invoice.JDate=new Date(data.recordsets[0][0].dat);
            this.tableArray=data.recordsets[1];
            // console.log(this.invoice);
            this.spinnerService.hide();
          },err => {
            this.ds.invalidForm = true;
            this.ds.errorMessage = "No data found.";
            this.spinnerService.hide();
            console.log(err);
          });
 
        }
      })
  }
  ngOnInit() {
}
getPartyDet(){
  this.invoice.PM_ID= jQuery('.selectpicker').find("option:selected").val();
  this.invoice.PM_NAME= jQuery('.selectpicker').find("option:selected").text();
  this.getBatchNo(this.invoice);
}
  getEmployee(){
      this.ds.getData('/employee').then((data:any) => {
        this.emplist = data.recordset|| [];
        this.getAuDisId();
      
      },err => {
          console.log(err);
          this.spinnerService.hide();
      })
    }
  getTransport(){
    this.ds.getData('/getTransport').then((data:any) => {
      this.transport = data.recordset|| [];    
    },err => {
        console.log(err);
        this.spinnerService.hide();
    })
  }

  disparty(){
    if(this.tableArray.length>0){
      this.isAdd=true;
      setTimeout(function () {
        jQuery(".selectpicker").selectpicker("refresh");
        jQuery('.selectpicker').selectpicker();
      }, 250);
    }else{
      this.isAdd=false;
      setTimeout(function () {
        jQuery(".selectpicker").selectpicker("refresh");
        jQuery('.selectpicker').selectpicker();
      }, 250);
    }
  }

addparticular(){
  let count=this.tableArray.findIndex(x => x.batch.toLowerCase() == this.invoice.GR_Batch.toLowerCase());
  if(this.invoice.GR_Batch==""||typeof(this.invoice.GR_Batch)=="undefined"){
    // alert("Please select batch");
    swal("Error!", "Please select batch!", "error");
  }else if(this.selectedItems.length<=0){
      // alert("Please Select batch Packing ID");
      swal("Error!", "Please Select batch Packing ID!", "error");
  }else if(count!=-1){
    // alert("Batch Already Insert");
    swal("Error!", "Batch Already Insert!", "error");
  }else{
  let obj:any={};
  obj.batch=this.invoice.GR_Batch;
  let itemVal="";     
  let Tmeter=0;
  let tpcs=0;   
  for (let num of this.selectedItems) {
      itemVal=itemVal+ "," + num.itemName;  
      Tmeter=Tmeter+num.TMTR;
      tpcs=tpcs+num.TPCS;
  }
  obj.tmtr=Tmeter;
  obj.tpces=tpcs;
  obj.pckid=itemVal;
  this.tableArray.push(obj);
  this.calculateTotal();
  obj={};
  this.invoice.GR_Batch="";
  this.selectedItems=[];
}
this.disparty();
}
verticalSum(array, colname){
  let total = 0;
  array.forEach(item => {
    total += Number(item[colname]);
  });
  return total.toFixed(2);
}
calculateTotal(){
 this.invoice.pcs=this.verticalSum(this.tableArray, "tpces");
  this.invoice.TMeter =this.verticalSum(this.tableArray, "tmtr");
}
removeParticular(index){
    this.tableArray.splice(index,1)
    this.calculateTotal();
    this.disparty();
}

  getAuDisId(){
      this.ds.getData('/dispatchID').then((data:any) => {
        this.invoice.dispNo= data.recordset[0].cnt;
        this.spinnerService.hide();
        this.getTransport();
      },err => {
        console.log(err);
        this.spinnerService.hide();
      })
      
    }

packingId(batch){
    this.spinnerService.show();
      this.dropdownList=[];
      this.selectedItems=[];
      this.invoice.TMeter=0;
      this.invoice.pcs=0;
      this.ds.getData('/packingBatchList',batch).then((data:any) => {
      this.dropdownList=data.recordset|| [];
      this.spinnerService.hide();
  },err => {
    console.log(err);
    this.spinnerService.hide();
})
}
getBatchNo(party){
  this.spinnerService.show();
  // this.params.partyId=party.PM_ID;
  // this.partyId=party.PM_ID;
  this.ds.getData('/dispatchbatch',party.PM_ID).then((data:any) => {
    this.partyBatch = data.recordset|| [];
    this.spinnerService.hide();
  },err => {
    console.log(err);
    this.spinnerService.hide();
  })
}
onItemSelect(item:any){
    // this.invoice.TMeter=0;
    // this.invoice.pcs=0;
    //     let Tmeter=0;
    //     let tpcs=0;
    //     for (let num of this.selectedItems) {
    //           Tmeter=Tmeter+num.TMTR;
    //           tpcs=tpcs+num.TPCS;
    //     }
    // this.invoice.TMeter=Tmeter;
    // this.invoice.pcs=tpcs;
}
OnItemDeSelect(item:any){
  //   this.invoice.TMeter=0;
  //     this.invoice.pcs=0;
  //     let Tmeter=0;
  //     let tpcs=0;
  //     for (let num of this.selectedItems) {
  //           Tmeter=Tmeter+num.TMTR;
  //           tpcs=tpcs+num.TPCS;
  //     }
  // this.invoice.TMeter=Tmeter;
  // this.invoice.pcs=tpcs;
}
deletedisp(){
  console.log(this.invoice.id);
  // this.ds.deleteData('/disptachdel',this.invoice.id).then((data:any) => {
  //   alert("Deleted Successfully");
  // },err => {
  //   console.log(err);
  // })
}
saveForm(frm,val){
      
    let itemVal="";        
	            for (let num of this.selectedItems) {
              itemVal=itemVal+ "," + num.itemName;  
              }
    this.invoice.pckId=itemVal;
  if(frm.invalid==true){
    // alert("Please fill require detail");
    swal("Error!", "Please fill require detail!", "error");
}else if(this.tableArray.length<=0){
  // alert("Please Insert atleast one Batch");
  swal("Error!", "Please Insert atleast one Batch!", "error");
}else{
  this.isSaving=true;
     delete this.invoice.GR_Batch;
     this.invoice.RecQtyList=this.tableArray;
    this.invoice.JDate = this.datePipe.transform(this.invoice.JDate, 'yyyy-MM-dd');
    this.ds.postData('/DispatcInsert', this.invoice).then((data:any) => {
    this.ds.formSubmitted = true;
    this.invoice={};  
    this.selectedItems=[];
    this.partyBatch=[];
    this.tableArray=[];
    this.isAdd=false;
    setTimeout(function () {
      jQuery(".selectpicker").val('').selectpicker("refresh");
      jQuery('.selectpicker').selectpicker();
    }, 250);
    this.invoice.RecQtyList=[];
    this.dropdownList=[];
    this.selectedItems=[];
    this.invoice.JDate=new Date();
    // frm.reset();
    this.getAuDisId();
    swal("Success!", "Data Saved Successfully!", "success");
    // this.ds.submittedMessage = "Form Submitted Successfully.";
    this.isSaving=false;
  },err => {
  err = err.json();
  this.ds.invalidForm = true;
  this.ds.errorMessage = err.error.message;
  console.log(err);
  });}
}
reset(){
  this.invoice={};  
  this.selectedItems=[];
  this.partyBatch=[];
  this.tableArray=[];
  this.isAdd=false;
  setTimeout(function () {
    jQuery(".selectpicker").val('').selectpicker("refresh");
    jQuery('.selectpicker').selectpicker();
  }, 250);
  this.invoice.RecQtyList=[];
  this.dropdownList=[];
  this.selectedItems=[];
  this.invoice.JDate=new Date();
  this.getAuDisId();
  swal("Cleared!", "Form Reset", "info");
}
}
