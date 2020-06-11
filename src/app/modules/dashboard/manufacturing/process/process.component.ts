import { Component, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { ActivatedRoute } from '@angular/router';
import * as $ from "jquery";
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
declare var jQuery: any;
import { DatePipe } from '@angular/common';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit,AfterViewInit {
  ngAfterViewInit(): void {
    //jQuery('.selectpicker').selectpicker();
  }


  dropdownList = [];
  selectedItems = [];
  product:any;
  dropdownSettings = {};
  productList:any=[];
  machine:any=[];
  productType:any=[];
  productName:any[];
  @ViewChild("focusText") _el: ElementRef;
  isAdd:boolean=false;
  processList=[];
  finalresult=[];
  procId:any;
  isReProc:boolean=false;
  GodownArr:any=[];
invoice:any={
    PR_ID:"",
		Batch:"",
		TotQty:0,
		processId:" ",
    JDate:"",
    tpcs:0,
    Tmeter:0,
    RecQtyList:[],
    ptype:"TD"
  };
  RecQtyList:any=[];
  particular : any = {
    IM_ID:"",
    quantity : 0.000,
    unit :""
};
  process:any={};
  basicdatails:any={};
  particularprint:any=[
  ];
  negtive:boolean=false;
  isSaving:boolean=false;
  constructor(public ds : DataServiceService,private datePipe: DatePipe,config: NgbDatepickerConfig, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) {
    const currentDate = new Date();

    config.minDate = {year:currentDate.getFullYear(), month:currentDate.getMonth(), day: currentDate.getDate()-2};
    config.maxDate = {year:currentDate.getFullYear(), month:currentDate.getMonth(), day: currentDate.getDate()+2};

    config.outsideDays = 'hidden';

    this.particularprint=[
    //   {itm: "Productest", JPRD_UNIT: "Nos", qty: 1, JPRD_RMK: "test final"}
    // ,{itm: "testitem", JPRD_UNIT: "No", qty: 0.2, JPRD_RMK: ''}
    // ,{itm: "Productest", JPRD_UNIT: "Nos", qty: 2, JPRD_RMK: "test2"}
    // , {itm: "testitem", JPRD_UNIT: "No", qty: 0.2, JPRD_RMK: ''}
    // , {itm: "Productest", JPRD_UNIT: "Nos", qty: 1, JPRD_RMK: "test1"} ,{itm: "testitem", JPRD_UNIT: "No", qty: 1, JPRD_RMK: null}
    // , {itm: "Productest", JPRD_UNIT: "Nos", qty: 1, JPRD_RMK: null}
  ];
    this.invoice.ptype="TD";
    route.params.subscribe(params => {

    if(!params.id){
    this.invoice.JDate=new Date();
    this.ds.getData('/JobProcess').then((data:any) => {
      this.processList=data.recordset|| [];
      },err => {
    console.log(err);
      })
    }else if(params.id==":Rprocss"){
      this.isReProc=true;
      this.invoice.JDate=new Date();
      this.ds.getData('/JobProcess').then((data:any) => {
        this.processList=data.recordset|| [];
        },err => {
      console.log(err);
        })
    }
    else{
     
      this.isAdd=true;
      ds.getData('/processView/'+params.id).then((data:any) => {
				this.spinnerService.show();
				if(!data){
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					this.spinnerService.hide();
					return ;
        }
        this.invoice=data.recordset[0];
        this.invoice.JDate=new Date();
        this.invoice.RecQtyList=[];
        this.getMachine();
				this.spinnerService.hide();
			},err => {
				this.ds.invalidForm = true;
				this.ds.errorMessage = "No data found.";
				this.spinnerService.hide();
				console.log(err);
			});
    }
  });
}



getColor(item:any) {
  if(item.JPRD_RMK != null){
      if(item.JPRD_RMK != ""){
          return 'table-info';
      }else{
        return 'abc';
      }
  }else{
  return 'abc';
}}

getBatch(proc){
   this.invoice.processId=proc.ProcsId;
  if(this.isReProc==true){
    this.jobcardReProcess();
  }else{
    this.JobCardId();
  }
    this.selectedItems = [];
    this.dropdownSettings = {
                              singleSelection: false,
                              text:"Select Batch",
                              selectAllText:'Select All',
                              unSelectAllText:'UnSelect All',
                              enableSearchFilter: true,
                              classes:"myclass custom-class"
                            };
}

  ngOnInit() {
 
    // if(this.isAdd==false){

    // }
    // this.selectedItems = [];
    // this.dropdownSettings = {
    //                           singleSelection: false,
    //                           text:"Select Batch",
    //                           selectAllText:'Select All',
    //                           unSelectAllText:'UnSelect All',
    //                           enableSearchFilter: true,
    //                           classes:"myclass custom-class"
    //                         };
}

  getId(){
  this.ds.getData('/processId').then((data:any) => {
      this.invoice.PR_ID="JP"+data.recordset[0].ID;
      this.getMachine();
    });
  }

  jbtypeId(){
    this.route.params.subscribe(params => {
      if(params.id==":Rprocss"){
        this.jobcardReProcess();
      }else{
        this.JobCardId();
      }
    });
  }

  JobCardId(){
      this.spinnerService.show();
      this.ds.getData('/JobCardId',this.invoice).then((data:any) => {
      this.dropdownList=data.recordset|| [];
      this. getId();
      this.spinnerService.hide();
      },err => {
    console.log(err);
    this.spinnerService.hide();
  })
}
jobcardReProcess(){
  this.spinnerService.show();
  this.ds.getData('/JobPRocssId',this.invoice).then((data:any) => {
  this.dropdownList=data.recordset|| [];
  this. getId();
  this.spinnerService.hide();
  },err => {
console.log(err);
this.spinnerService.hide();
})
}

addParticular(particular){
    if(this.isAdd==true){this.dropdownList.length=1;}
	if(this.dropdownList.length<=0){
      swal("Error!", "Please select Batch!", "error");
    }else if(particular.IM_NM=="" || particular.IM_UM=="" || particular.IM_ID=="" ){
          //alert("please select Item & Unit");
          swal("Error!", "Please select Item & Unit!", "error");
      }else if(particular.quantity=="" || particular.quantity==0){
         // alert("Please insert quantity");
          swal("Error!", "Please insert quantity!", "error");
      }
      // else if(particular.aqty<particular.quantity){
      //   this.negtive=true;
      //   let item = Object.assign({}, particular);
      //   this.particular={ IM_TYP:item.IM_TYP,IM_ID:"",IM_NM:"",quantity : 1, unit :item.unit };
      //   this.particular.quantity=1;
      //   this.invoice.RecQtyList.push(item);
      //   this._el.nativeElement.focus();
      //   this.calculateTotal(this.invoice);
      //   this.negtive=false;
      // }
      else{
        let item = Object.assign({}, particular);
        this.particular={ IM_TYP:item.IM_TYP,IM_ID:"",IM_NM:"",quantity : 1, unit :item.unit };
        this.particular.quantity=1;
        this.invoice.RecQtyList.push(item);
        this._el.nativeElement.focus();
        this.calculateTotal(this.invoice);
        this.negtive=false;
  }
}
removeParticular(index){
  this.invoice.RecQtyList.splice(index, 1);
  this.calculateTotal(this.invoice);
}

calculateTotal(invoice){
  invoice.totalQty = this.verticalSum(this.invoice.RecQtyList, "quantity");
}

verticalSum(array, colname){
  let total = 0;
  array.forEach(item => {
    total += Number(item[colname]);
  });
  return total.toFixed(2);
}

getpructType(){
  let test:any=[];
  test  = this.productList.filter(product => product.IM_TYP != 'Grey Material');
  let result = test.map(a => a.IM_TYP);
  this.finalresult = result.filter((IM_TYP, i,product) => i === product.indexOf(IM_TYP));
  jQuery('.selectpicker').selectpicker();
}
getProductName(typ){
  this.productName  = this.productList.filter(product => product.IM_TYP == typ && product.IM_CAT=="Process Material" && product.IM_TYP != 'Grey Material');
  this.spinnerService.show();
  setTimeout(function () {
    jQuery(".selectpicker").selectpicker("refresh");
    jQuery('.selectpicker').selectpicker();
  }, 250);
  this.spinnerService.hide();
}
getItemDetails(){
  this.particular.IM_ID= jQuery('.selectpicker').find("option:selected").val();
  this.particular.IM_NM= jQuery('.selectpicker').find("option:selected").text();
  let productdetails:any=[];
  productdetails  = this.productName.filter(product => product.IM_ID == this.particular.IM_ID && product.IM_NM==this.particular.IM_NM);
  console.log(productdetails[0]);
  this.particular.IM_UM=productdetails[0].IM_UM;
  this.particular.qty=productdetails[0].qty;
  this.getUnit(this.particular);
}

getUnit(detail){
  this.particular.unit=detail.IM_UM;
  this.particular.quantity=0.000;
  this.particular.aqty=detail.qty;
}

// getgodown(){

// 	this.ds.getData('/Godown').then((data:any) => {
//     this.GodownArr = data.recordset|| [];
// 	},err => {
// 			console.log(err);
// 	})
// }
getProduct(){
  this.spinnerService.show();
  this.finalresult=[];
  this.ds.getData('/Inventory_Products').then((data:any) => {
    this.productList = data.recordset|| [];
   
    this.spinnerService.hide();
    this.getpructType();
  },err => {
    console.log(err);
    this.spinnerService.hide();
  })
}
getMachine(){

  this.spinnerService.show();
  this.ds.getData('/machine').then((data:any) => {
    this.machine = data.recordset|| [];
    this.spinnerService.hide();
    this.getProduct();
  },err => {
    console.log(err);
    this.spinnerService.hide();
  })
}
saveForm(frm,val){
      if(frm.invalid==true){
        //  alert("Please fill require detail");
        swal("Error!", "Please fill require detail!", "error");
      }else if(this.invoice.RecQtyList<=0){
       // alert("Please Insert atleast one item");
        swal("Error!", "Please Insert atleast one item!", "error");
      }else{
        if(this.isAdd==false){
          this.isSaving=true;
               let itemVal="";
	            for (let num of this.selectedItems) {
              itemVal=itemVal+ "," + num.itemName;
          }
          if(this.isReProc==true){
            this.invoice.type="Reprocess";
          }else{
            this.invoice.type="Process";
          }
          this.invoice.Batch=itemVal;
          this.invoice.joblist=this.selectedItems;
          this.invoice.JDate = this.datePipe.transform(this.invoice.JDate, 'yyyy-MM-dd');
          this.ds.postData('/JPRC_Insert', this.invoice).then((data:any) => {
          this.ds.formSubmitted = true;
          this.invoice={};
          this.invoice.JDate=new Date();
          this.particular={IM_ID:"",IM_NM:"", unit:"MTR", quantity:0};
          this.invoice.RecQtyList=[];
          this.dropdownList=[];
          this.selectedItems=[];
          // this.ds.submittedMessage = "Form Submitted Successfully.";
          jQuery(".selectpicker").val('').selectpicker("refresh");
          swal("Success!", "Data Saved Successfully!", "success");
          this.isSaving=false;
        },err => {
        err = err.json();
        this.ds.invalidForm = true;
        this.ds.errorMessage = err.error.message;
        console.log(err);
      });
    }
      else{
        this.isSaving=true;
        this.invoice.JDate = this.datePipe.transform(this.invoice.JDate, 'yyyy-MM-dd');
        this.ds.postData('/JPRC_Update', this.invoice).then(data => {
          this.ds.formSubmitted = true;
          this.invoice={};
          this.invoice.JDate=new Date();
          this.particular={IM_ID:"",IM_NM:"",unit:"MTR", quantity:0};
          this.invoice.RecQtyList=[];
          this.dropdownList=[];
          this.selectedItems=[];
          this.getId();
          // this.ds.submittedMessage = "Form Submitted Successfully.";
          jQuery(".selectpicker").val('').selectpicker("refresh");
          swal("Success!", "Data Saved Successfully!", "success");
          this.isSaving=false;

        }, err => {
          err = err.json();
          this.ds.invalidForm = true;
          this.ds.errorMessage = err.error.message;
          console.log(err);
        })
      }

  }
}
check(){
  console.log(this.particular.aqty);
  console.log(this.particular.quantity);
  if(this.particular.aqty<this.particular.quantity){
    this.negtive=true;
  }else{
    this.negtive=false;
  }
}

onItemSelect(item:any){
    this.invoice.partyName="";
    this.invoice.Tmeter=0;
    this.invoice.Tpcs=0;
    let partyName="";
    let Tmeter=0;
    let tpcs=0;
    let rmk:string=''
    let shdNo:string=''
    let quality:string=''
	  for (let num of this.selectedItems) {
      console.log(num);
            partyName=partyName+ "," + num.supp;
            Tmeter=Tmeter+parseFloat(num.Tps);
            tpcs=tpcs+parseFloat(num.tmr);
            rmk=  rmk+','+num.JBC_RMK;
            shdNo=shdNo+','+num.shdNo;
            quality=quality+','+ num.quality;
    }
    this.invoice.partyName=partyName;
    this.invoice.Tmeter=Tmeter;
    this.invoice.tpcs=tpcs;
    this.invoice.jbrmk=rmk;
    this.invoice.shdNo=shdNo;
    this.invoice.quality=quality;
}
OnItemDeSelect(item:any){
   this.invoice.partyName="";
    this.invoice.Tmeter=0;
    this.invoice.Tpcs=0;
    let partyName="";
    let Tmeter=0;
    let tpcs=0;
    let rmk:string=''
    let shdNo:string=''
    let quality:string=''
	        for (let num of this.selectedItems) {
            partyName=partyName+ "," + num.supp;
            Tmeter=Tmeter+parseFloat(num.Tps);
            tpcs=tpcs+parseFloat(num.tmr);
            rmk=  rmk+','+num.JBC_RMK;
            shdNo=shdNo+','+num.shdNo;
            quality=quality+','+ num.quality;
    }
    this.invoice.partyName=partyName;
    this.invoice.Tmeter=Tmeter;
    this.invoice.tpcs=tpcs;
    this.invoice.jbrmk=rmk;
    this.invoice.shdNo=shdNo;
    this.invoice.quality=quality;
}
onSelectAll(items: any){
  //  console.log(items);
}
onDeSelectAll(items: any){
  //  console.log(items);
}

savPrint(frm,val){

  if(frm.invalid==true){
   // alert("Please fill require detail");
    swal("Error!", "Please fill require detail!", "error");
}else if(this.invoice.RecQtyList<=0){
  //alert("Please Insert atleast one item");
  swal("Error!", "Please insert atleast one item!", "error");
}else{
  if(this.isAdd==false){
         let itemVal="";
        for (let num of this.selectedItems) {
        itemVal=itemVal+ "," + num.itemName;
    }
    if(this.isReProc==true){
      this.invoice.type="Reprocess";
    }else{
      this.invoice.type="Process";
    }
    this.invoice.Batch=itemVal;
    this.invoice.joblist=this.selectedItems;
    this.invoice.JDate = this.datePipe.transform(this.invoice.JDate, 'yyyy-MM-dd');
    this.ds.postData('/JPRC_Insert', this.invoice).then((data:any) => {
      $('#butClick').click();
      this.ds.getData('/ProcessPrint/'+this.invoice.PR_ID).then((data:any) => {
        this.basicdatails=data.recordset[0];
        this.particularprint = data.recordsets[1] || [];
      },err => {
        console.log(err);
      })
    this.ds.formSubmitted = true;
    this.invoice={};
    this.particular={ IM_TYP:"",IM_ID:"",IM_NM:"",quantity : 0.000, unit :"MTR" };
    this.invoice.RecQtyList=[];
    this.dropdownList=[];
    this.selectedItems=[];
    setTimeout(function () {
      jQuery(".selectpicker").val('').selectpicker("refresh");
      }, 250);
    swal("Success!", "Data Saved Successfully!", "success");
  },err => {
  err = err.json();
  this.ds.invalidForm = true;
  this.ds.errorMessage = err.error.message;
  console.log(err);
});
}
else{
  let print:any={
      id:this.invoice.PR_ID,
      count:this.invoice.count
  }
  this.invoice.JDate = this.datePipe.transform(this.invoice.JDate, 'yyyy-MM-dd');
  this.ds.postData('/JPRC_Update', this.invoice).then((data:any) => {
    $('#butClick').click();
        this.ds.getData('/ProcessPrintAdd/',print).then((data:any) => {
            this.basicdatails=data.recordset[0];
            this.particularprint = data.recordsets[1] || [];
            // console.log(this.particularprint);
        },err => {
          console.log(err);
        })
    this.ds.formSubmitted = true;
    this.invoice={};
    this.particular={ IM_TYP:"",IM_ID:"",IM_NM:"",quantity : 0.000, unit :"MTR" };
    this.invoice.RecQtyList=[];
    this.dropdownList=[];
    this.selectedItems=[];
    // this.ds.submittedMessage = "Form Submitted Successfully.";
    setTimeout(function () {
      jQuery(".selectpicker").val('').selectpicker("refresh");
      }, 250);
    swal("Success!", "Data Saved Successfully!", "success");
  }, err => {
    err = err.json();
    this.ds.invalidForm = true;
    this.ds.errorMessage = err.error.message;
    console.log(err);
  })
}}
}
reset(){
  this.invoice={};
  this.invoice.JDate=new Date();

  this.particular={ IM_TYP:"",IM_ID:"",IM_NM:"",quantity : 0.000, unit :"MTR" };
  this.invoice.RecQtyList=[];
  this.dropdownList=[];
  this.selectedItems=[];
  setTimeout(function () {
    jQuery(".selectpicker").val('').selectpicker("refresh");
    jQuery('.selectpicker').selectpicker();
    }, 250);
  swal("Cleared!", "Form Reset", "info");
}

print(): void {
  let printContents, popupWin;
  printContents = document.getElementById('print-section').innerHTML;
  popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  popupWin.document.open();
  popupWin.document.write(`
    <html>
    <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <title>Process Print</title>
      <style>
        .modal-footer{
          visibility: hidden;
        }
        .table-info{
          border-bottom:dotted;
        }
        </style>
    </head>
  <body onload="window.print();window.close()">${printContents}</body>
    </html>`
  );
  popupWin.document.close();
}

}
