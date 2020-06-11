import { Component, OnInit, transition } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import {SelectModule} from 'ng2-select';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as $ from "jquery";
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
declare var jQuery: any;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-job-work',
  templateUrl: './job-work.component.html',
  styleUrls: ['./job-work.component.scss']
})
export class JobWorkComponent implements OnInit {

  party:any=[];
  invoice:any={
		GR_Batch:"",
		TotQty:0,
		processId:" ",
		 JDate:"",
		TMtr:0,
		TPCS:0,
		GR_ChallNo:"",
		GR_Chdate:""
		
	};
  process:any={};
  optionsModel: number[];
  TPCS:any=0;
  TMtr:any=0;
  partyBatch:any=[];
  params:any={};
  partyId:string="";
  RecQtyList:any=[];
  dropdownList = [];
  selectedItems = [];
  processNameList=[];
  costfreeProc=[];
  costfreeproclist=[];
  dropdownSettings = {};
  dropdownSettings2={};
  isValid:boolean=true;
  butDisabled:boolean=false;
  isSelected=false;
  isSaving:boolean=false;
  count:number=0;
  resetshow:boolean=true;
  
  
  constructor(public ds : DataServiceService,private datePipe: DatePipe, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) { 
	route.params.subscribe(params => {
		if(!params.id){
		this.invoice.JDate=new Date();
		this.ds.getData('/GreyParty','Vendor').then((data:any) => {
					this.party = data.recordset|| [];
					jQuery('.selectpicker').selectpicker();	
					this.getProcess();
				},err => {
						console.log(err);
				})
			}else{
				this.resetshow=false;
				this.isValid=false;
				this.butDisabled=true;
				ds.getData('/JobCard_Retrieve/'+params.id).then((data:any) => {
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
  
  getPartyDet(){
	this.invoice.PM_ID= jQuery('.selectpicker').find("option:selected").val();
	this.invoice.PM_NAME= jQuery('.selectpicker').find("option:selected").text();
	this.getBatchNo(this.invoice);
	console.log(this.invoice);
}

  getBatchNo(party){
				this.spinnerService.show();
				this.params.partyId=party.PM_ID;
				this.partyId=party.PM_ID;
				this.ds.getData('/partyBatchJobCard',party.PM_ID).then((data:any) => {
					this.partyBatch = data.recordset|| [];
					this.spinnerService.hide();
				},err => {
					console.log(err);
					this.spinnerService.hide();
				})
		
	}
	getJobCardBatch(batch){
		console.log(batch);
		this.spinnerService.show();
		var partybatch=batch;
		this.params.batch=batch;
		this.ds.getData('/JOBCardBatch',this.params).then((data:any) => {
			batch = data.recordset[0].ID ;
			if(batch==0)
			{
				this.invoice.GR_Batch=partybatch+"-B"+1;
				this.spinnerService.hide();
				
			}
			else
			{
				batch++;
				this.invoice.GR_Batch=partybatch+"-B"+batch;
				this.spinnerService.hide();
			}
			this.getDetails(partybatch,this.invoice.GR_Batch);
		},err => {
			console.log(err);
			this.spinnerService.hide();
		})
	}
	
	getDetails(batchNo,autobatch){
			this.spinnerService.show();
			this.params.batch=batchNo;
			this.params.suppId=this.partyId;
			let date=this.invoice.JDate;
			this.ds.getData('/GreyCheckJRecord',this.params).then((data:any) => {
			this.invoice.GR_Chdate=data.recordset[0].GR_Chdate;
			this.invoice.GR_ChallNo=data.recordset[0].GR_ChallNo;
			this.invoice.chkrmk=data.recordset[0].GRCHK_RMK; 
			this.invoice.GRCHK_Quality=data.recordset[0].GRCHK_Quality; 
			// this.invoice.GR_Chdate=2;
			// this.invoice=data.recordset[0] || null;
			this.invoice.GR_Batch=autobatch;
			this.RecQtyList=data.recordsets[1];
			this.invoice.GRCHK_Batch=batchNo;
			this.invoice.JDate=date;
			this.invoice.TPCS=0
			
			this.invoice.TMtr=0;
			this.spinnerService.hide();
			 
		},err => {
			console.log(err);
			this.spinnerService.hide();
		})
	}
	checkAll(even){
		
		if(even.target.checked==true){
		this.isSelected=true;
		this.RecQtyList.forEach(x =>  x.checked = even.target.checked);
		this.invoice.TMtr = this.verticalSum(this.RecQtyList, "Qty");
		this.invoice.TPCS=this.RecQtyList.length;
		}else{
			this.isSelected=false;
			this.RecQtyList.forEach(x =>  x.checked = even.target.checked);
			this.invoice.TMtr=0;
			this.invoice.TPCS=0;
		}
	}
	verticalSum(array, colname){
		let total = 0;
		array.forEach(item => {
			total += Number(item[colname]);
		});
		return total.toFixed(2);
	}
	check(index,even){
		
		this.RecQtyList[index].checked=even.target.checked;
		if(this.RecQtyList[index].checked==true){
		this.TMtr=parseFloat(this.invoice.TMtr)+parseFloat(this.RecQtyList[index].Qty);
		this.TPCS=parseFloat(this.invoice.TPCS)+1;
		}else{
		this.TMtr=parseFloat(this.invoice.TMtr)-parseFloat(this.RecQtyList[index].Qty);
		this.TPCS=parseFloat(this.invoice.TPCS)-1;
		}
		this.invoice.TPCS=this.TPCS;
		this.invoice.TMtr=this.TMtr;
	}

saveForm(frm,value){
	if(frm.invalid){
		// alert("Please insert Mandetory Fields");
		swal("Error!!", "Please insert Mandetory Fields", "error");
	}else if(this.selectedItems.length<=0){
		//alert("Please select Process");
		swal("Error!!", "Please select Process", "error");
	}else if(this.RecQtyList<=0){
		//alert("Please Insert atleat one record");
		swal("Error!!", "Please Insert atleat one record", "error");
	}else if(this.invoice.TPCS=="" || this.invoice.TPCS==0 ){
		//alert("Please choose atleast one item.");
		swal("Error!!", "Please choose atleast one item", "error");
	}else{
	this.count=this.count+1;
	if(this.count==1){
	this.isSaving=true;
	var partyID=this.params.partyId;
	this.invoice.PM_ID=partyID;
	this.invoice.dataList=this.RecQtyList;
	// this.selectedItems.push( {id: "1", itemName: "Finishing"});

	let itemVal="";
	let itemVal2="";

	for (let num of this.selectedItems) { 
		itemVal=itemVal+ "," + num.id;
	}
	for (let num1 of this.costfreeproclist) {
		itemVal2=itemVal2+ "," + num1.id;
	}
	this.invoice.processId=itemVal;
	this.invoice.costfrpco=itemVal2;
	this.invoice.JDate = this.datePipe.transform(this.invoice.JDate, 'yyyy-MM-dd');
		this.ds.postData('/JobCardInsert', this.invoice).then((data:any) => {
				this.ds.formSubmitted = true;
				frm.resetForm();
				this.invoice={};
				this.invoice.JDate=new Date();
				this.TPCS=0;
				this.TMtr=0;
				this.count=0;
				this.RecQtyList=[];
				this.selectedItems=[];
				this.costfreeproclist=[];
				this.isSelected=false;
				this.isSaving=false;
				// this.ds.submittedMessage = "Form Submitted Successfully.";
				setTimeout(function () {
					jQuery(".selectpicker").val('').selectpicker("refresh");
					jQuery('.selectpicker').selectpicker();
				  }, 250);
				swal("Success!", "Data Saved Successfully!", "success");
				this.isSaving=false;
			},err => {
				err = err.json();
				this.ds.invalidForm = true;
				this.ds.errorMessage = err.error.message;
				console.log(err);
				this.isSaving=false;
			})
	 }
	}
}
reset(){
	this.invoice={};
				this.invoice.JDate=new Date();
				this.TPCS=0;
				this.TMtr=0;
				this.count=0;
				this.RecQtyList=[];
				this.selectedItems=[];
				this.costfreeproclist=[];
				this.isSelected=false;
				this.isSaving=false;
				// this.ds.submittedMessage = "Form Submitted Successfully.";
				setTimeout(function () {
					jQuery(".selectpicker").val('').selectpicker("refresh");
					jQuery('.selectpicker').selectpicker();
				  }, 250);
				  swal("Cleared!", "Form Reset", "info");
}
	
	onItemSelect(item:any){
        // console.log(item);
        // console.log(this.selectedItems);
    }
    OnItemDeSelect(item:any){
        // console.log(item);
        // console.log(this.selectedItems);
    }
    onSelectAll(items: any){
        // console.log(items);
    }
    onDeSelectAll(items: any){
        // console.log(items);
	}
	
	onItemSelect1(item:any){
         //console.log(item);
       // console.log(this.selectedItems);
    }
    OnItemDeSelect1(item:any){
        // console1.log(item);
        // console.log(this.selectedItems);
    }
    onSelectAll1(items: any){
        // console.log(items);
    }
    onDeSelectAll1(items: any){
        // console.log(items);
    }
	

  ngOnInit() {
			

        this.selectedItems = [];
        this.dropdownSettings = { 
                                  singleSelection: false, 
                                  text:"Select Process",
                                  selectAllText:'Select All',
                                  unSelectAllText:'UnSelect All',
                                  enableSearchFilter: true,
                                  classes:"myclass custom-class"
								};      
		this.dropdownSettings2 = { 
									singleSelection: false, 
									text:"Select Process",
									selectAllText:'Select All',
									unSelectAllText:'UnSelect All',
									enableSearchFilter: true,
									classes:"myclass custom-class"
								  }; 		
    }
	savprocs(proc){
			if(proc.procName==""){
				//alert("Please Insert Process Name");
				swal("Error", "Please Insert Process Name", "error");
			}else{
				this.ds.postData('/ProcInsert', proc).then((data:any) => {
					this.process={};
					//alert("Process Save Successfully.");
					swal("success", "Process Save Successfully.!", "success");
					$('#Close').click();
					this.getProcess();
				},err => {
					err = err.json();
					console.log(err);
				})
			}
	}
	getProcess(){
		this.ds.getData('/getProcess').then((data:any) => {
			this.dropdownList = data.recordset|| [];
			this.processNameList=data.recordsets[1];
			this.costfreeProc=data.recordsets[2];
		},err => {
				console.log(err);
		})
	}
}
