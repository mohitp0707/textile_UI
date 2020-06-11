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
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.scss']
})
export class PackingComponent implements OnInit {

  party:any=[];
  invoice:any={
		GR_Batch:"",
		TotQty:0,
		processId:" ",
		JDate:"",
		TMtr:0,
    TPCS:0,
    TPMtr:0
		
  };
  TPMtr:any=0;
  TPCS:any=0;
  TMtr:any=0;
  partyBatch:any=[];
  RecQtyList:any=[];
  isValid:boolean=true;
  emplist:any=[];
  GodownArr:any=[];
  isSaving:boolean=false;
  dataadded:boolean=false;

  constructor(public ds : DataServiceService,private datePipe: DatePipe, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) { 
    route.params.subscribe(params =>{
      if(!params.id){
      this.invoice.JDate=new Date();
      this.ds.getData('/GreyParty','Vendor').then((data:any) => {
            this.party = data.recordset|| [];
            jQuery('.selectpicker').selectpicker();	
            this.getEmployee();
          },err => {
              console.log(err);
          })
        }else{
          this.isValid=false;
          ds.getData('/Packing_retrieve/'+params.id).then((data:any) => {
            this.spinnerService.show();
            if(!data){
              this.ds.invalidForm = true;
              this.ds.errorMessage = "No data found.";
              this.spinnerService.hide();
              return ;
            }
            let party1:string="MOHIT";
            this.invoice=data.recordset[0];
            this.RecQtyList=data.recordsets[1];
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

    test(){
     console.log(this.invoice);
    }

    getEmployee(){
      this.ds.getData('/employee').then((data:any) => {
        this.emplist = data.recordset|| [];
        this.getgodown();
      },err => {
          console.log(err);
      })
    }
    getgodown(){
      this.ds.getData('/Godown').then((data:any) => {
        this.GodownArr = data.recordset|| [];
        console.log(this.GodownArr);
        this.GodownArr= this.GodownArr.filter(product => product.GM_Typ == 'Finish Godown');
        // console.log(this.GodownArr);
      },err => {
          console.log(err);
      })
    }
    getPartyDet(){
      this.invoice.PM_ID= jQuery('.selectpicker').find("option:selected").val();
      this.invoice.PM_NAME= jQuery('.selectpicker').find("option:selected").text();
      this.getBatchNo(this.invoice);
    }
    getBatchNo(party){
      this.spinnerService.show();
      // this.params.partyId=party.PM_ID;
      // this.partyId=party.PM_ID;
      console.log(party);
      this.ds.getData('/packingbatch',party.PM_ID).then((data:any) => {
        this.partyBatch = data.recordset|| [];
        this.spinnerService.hide();
      },err => {
        console.log(err);
        this.spinnerService.hide();
      })
    }

    getDetails(batchNo){
			this.spinnerService.show();
			// this.params.batch=batchNo;
			// this.params.suppId=this.partyId;
			let date=this.invoice.JDate;
	this.ds.getData('/jobCardRecord',batchNo).then((data:any) => {
      this.RecQtyList=data.recordsets[1];
      this.dataadded=true;
      setTimeout(function () {
        jQuery(".selectpicker").selectpicker("refresh");
        jQuery('.selectpicker').selectpicker();
      }, 250);
      this.invoice.PCK_Quality=data.recordsets[0][0].JBC_Quality;
			this.invoice.TPCS=0;
			this.invoice.TMtr=0;
      this.spinnerService.hide();
      this.gemainID(batchNo);
		},err => {
			console.log(err);
			this.spinnerService.hide();
		})
  }
  gemainID(batch){
	 // console.log(batch);
    this.ds.getData('/packingBatchID',batch).then((data:any) => {
      this.invoice.pckMainID=data.recordset[0].id;
	  console.log(data.recordset[0].id);
      this.spinnerService.hide();
      this.getAutoManuNo(batch);
		},err => {
			console.log(err);
			this.spinnerService.hide();
		})
    
  }
  getAutoManuNo(batch){
    this.ds.getData('/packingManId',batch).then((data:any) => {
      this.invoice.packgNo=this.invoice.pckMainID + "-" +data.recordset[0].cnt;
			this.spinnerService.hide();
		},err => {
			console.log(err);
			this.spinnerService.hide();
		})
    
  }
  check(index,even){
		this.RecQtyList[index].checked=even.target.checked;
		if(this.RecQtyList[index].checked==true){
      // if (typeof this.RecQtyList[index].pqty == 'undefined'){
      //   this.RecQtyList[index].pqty=0
      // }
    // this.TPMtr=parseFloat(this.invoice.TPMtr)+parseFloat(this.RecQtyList[index].pqty);
		// this.TMtr=parseFloat(this.invoice.TMtr)+parseFloat(this.RecQtyList[index].qty);
		this.TPCS=parseFloat(this.invoice.TPCS)+1;
		}else{
    // this.TPMtr=parseFloat(this.invoice.TPMtr)-parseFloat(this.RecQtyList[index].pqty);
		// this.TMtr=parseFloat(this.invoice.TMtr)-parseFloat(this.RecQtyList[index].qty);
		this.TPCS=parseFloat(this.invoice.TPCS)-1;
    }
    this.invoice.TPMtr=this.verticalSum(this.RecQtyList, "pqty");
		this.invoice.TPCS=this.TPCS;
		this.invoice.TMtr=this.verticalSum(this.RecQtyList, "qty");
  }
  addQty(index,qty){
    // this.RecQtyList[index].PkgQty=qty;

      if (typeof this.RecQtyList[index].pqty == 'undefined'){
        this.RecQtyList[index].pqty=0
      }
    this.invoice.TPMtr = this.verticalSum(this.RecQtyList, "pqty");
  }

  verticalSum(array, colname){
		let total = 0;
		array.forEach(item => {
      // if(typeof item.pqty == 'undefined'){

      // }
      if(item.checked==true){
        if(typeof item[colname] == 'undefined'){
          item[colname]=0;
        }
      total += Number(item[colname]);
    }
		});
		return total.toFixed(2);
	}

  ngOnInit() {
  }

  saveForm(frm,value){
   
    if(frm.invalid){
      // alert("Please insert Mandetory Fields");
      swal("Error!", "Please insert Mandetory Fields!", "error");
    }else if(this.RecQtyList.length<=0){
      // alert("Please Insert atleat one record");
      swal("Error!", "Please Insert atleat one record!", "error");
    }else if(this.invoice.TPCS=="" || this.invoice.TPCS==0 ){
      // alert("Please choose atleast one item.");
      swal("Error!", "Please choose atleast one item!", "error");
    }else{
      this.isSaving=true;
      this.invoice.RecQtyList=this.RecQtyList;
      let indArry=[];
      this.invoice.JDate = this.datePipe.transform(this.invoice.JDate, 'yyyy-MM-dd');
      this.ds.postData('/packingInsert', this.invoice).then((data:any) => {
        this.invoice.RecQtyList.forEach((element, index) => {
          if(element.checked==true){ 
            indArry.push(index);
           }});
		       this.isSaving=false;
           for(var i = 0; i < indArry.length; i++){
            var index = indArry[i] - i;
            this.RecQtyList.splice(index, 1);
          }
          swal("DATA SAVED", "save Sucessfully!", "success");
          this.invoice.JDate=new Date(this.invoice.JDate);
          this.invoice.TPCS=0;
          this.invoice.TMtr=0;
          this.invoice.TPMtr=0;
          this.getAutoManuNo(this.invoice.GRCHK_Batch);  
        if(this.RecQtyList.length<=0){
          this.ds.formSubmitted = true;
          frm.resetForm();
          this.invoice={};
          this.invoice.JDate=new Date();
          this.invoice.packgNo="";
          this.TPCS=0;
          this.TMtr=0;
          this.RecQtyList=[];
          // this.ds.submittedMessage = "Form Submitted Successfully.";
          this.dataadded=false;
          setTimeout(function () {
            jQuery(".selectpicker").val('').selectpicker("refresh");
            jQuery('.selectpicker').selectpicker();
          }, 250);
          swal("Success!", "Data Saved Successfully!", "success");
          
          this.isSaving=false;
        }
        },err => {
          err = err.json();
          this.ds.invalidForm = true;
          this.ds.errorMessage = err.error.message;
          console.log(err);
        })
    }
  }
  reset(){
    this.invoice={};
    this.invoice.JDate=new Date();
    this.invoice.packgNo="";
    this.TPCS=0;
    this.TMtr=0;
    this.RecQtyList=[];
    // this.ds.submittedMessage = "Form Submitted Successfully.";
    this.dataadded=false;
    setTimeout(function () {
      jQuery(".selectpicker").val('').selectpicker("refresh");
      jQuery('.selectpicker').selectpicker();
    }, 250);
    swal("Cleared!", "Form Reset", "info");
  }
}
