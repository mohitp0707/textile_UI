import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-watertank',
  templateUrl: './watertank.component.html',
  styleUrls: ['./watertank.component.scss']
})
export class WatertankComponent implements OnInit {

  party:any=[];
  isValid:boolean=true;
  emplist:any=[];
  productList:any=[];
  invoice:any={
    total:0,
    RecQtyList:[],
    Tqty:0
  };
  GodownArr:any=[];
  particular : any = {
		IM_NM : "",
		unit : "",
    quantity : 0.0,
    vhNo:"",
		rate:0,
		GR_Date:""
	};

  constructor(public ds : DataServiceService, public route : ActivatedRoute,private datePipe: DatePipe,private router:Router,private spinnerService: Ng4LoadingSpinnerService) {
    route.params.subscribe(params => {
      if(!params.id){
        this.spinnerService.show();
        this.ds.getData('/waterParty','Vendor').then((data:any) => {
          this.party = data.recordset|| [];
          this.party  = this.party.filter(party1 => party1.PM_PTYP == 'water Supp');
          this.employee();
          this.spinnerService.hide();
        },err => {
            console.log(err);
            this.spinnerService.hide();
        })
      }
      else
      {
        ds.getData('/watertankview/'+params.id).then((data:any) => {
          this.spinnerService.show();
          if(!data){
            this.ds.invalidForm = true;
            this.ds.errorMessage = "No data found.";
            this.spinnerService.hide();
            return ;
          }
          this.isValid=false;
          this.invoice=data.recordset[0];
          this.invoice.JDate=new Date(data.recordset[0].dat);
          this.invoice.RecQtyList=data.recordsets[1];
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
  
  employee(){
    this.spinnerService.show();
    this.invoice.JDate=new Date();
    this.ds.getData('/employee').then((data:any) => {
          this.emplist = data.recordset|| [];
          this.getProduct();
        },err => {
            console.log(err);
            this.spinnerService.hide();
        })
  }

  getProduct(){
		this.spinnerService.show();
    this.ds.getData('/WATERITM').then((data:any) => {
      this.productList = data.recordset|| [];
			this.spinnerService.hide();
		},err => {
			console.log(err);
			this.spinnerService.hide();
		})
  }

  addParticular(particular){
    console.log(particular);
    if(particular.IM_NM=="" || particular.unit=="" || typeof(particular.IM_NM)=="undefined" || typeof(particular.unit)=="undefined"){
      swal("Error!", "Please Select Item & unit!!", "error");
    }else if(particular.vhNo=="" ){
        //alert("Insert Vehicle No");
        swal("Error!", "Insert Vehicle No!!", "error");
    }else if(particular.quantity=="" || particular.quantity==0){
       // alert("Please insert quantity");
        swal("Error!", "Please insert quantity!!", "error");
    }else if(particular.vhNo==""){
      //alert("Please Insert Vehicle No");
      swal("Error!", "Please Insert Vehicle No", "error");
    }
    else{
      let item = Object.assign({}, particular);

      this.particular={ IM_TYP:item.IM_TYP,IM_ID:item.IM_ID,vhNo:"",IM_NM:item.IM_NM,quantity : 1,rate:1, unit :item.unit };
      this.particular.quantity=1;
      this.particular.rate=1;
      this.invoice.RecQtyList.push(item);
      this.calculateTotal(this.invoice);
}
}
removeParticular(index){
this.invoice.RecQtyList.splice(index, 1);
 this.calculateTotal(this.invoice);
}
verticalSum(array, colname){
  let total = 0;
  array.forEach(item => {
    total += Number(item[colname]);
  });
  return total.toFixed(2);
}
calculateTotal(invoice){
  invoice.Tqty = this.verticalSum(this.invoice.RecQtyList, "quantity");
}
getUnit(detail){
  this.particular.unit=detail;
}
saveForm(formName,input){

  this.route.params.subscribe(params => {
    if(!params.id){
  this.spinnerService.show();
  if(formName.invalid==true){
   // alert("Please fill require filled");
    swal("Error!", "Please fill require filled", "error");
    this.spinnerService.hide();
  }else if(this.invoice.RecQtyList.length<=0){
    //alert("Please insert item");
    swal("Error!", "Please insert item", "error");
    this.spinnerService.hide();
  }else
  {
    input.JDate = this.datePipe.transform(this.invoice.JDate, 'yyyy-MM-dd');
  this.ds.postData('/WATERInsert', input).then((data:any) => {
      this.ds.formSubmitted = true;
      formName.resetForm();
      this.invoice={};
      this.invoice.JDate=new Date();
      this.particular={vhNo:"",IM_NM:"",quantity:0,rate:0 };
      this.invoice.RecQtyList=[];
      this.ds.submittedMessage = "Form Submitted Successfully.";
      this.spinnerService.hide();
    },err => {
      err = err.json();
      this.ds.invalidForm = true;
      this.ds.errorMessage = err.error.message;
      console.log(err);
      
    })
  }}else{
    //alert("can not update Transaction Entry");
    swal("Error!", "Can not update Transaction Entry", "error");
  }
});}
reset(){
  this.invoice={};
      this.invoice.JDate=new Date();
      this.particular={vhNo:"",IM_NM:"",quantity:0,rate:0 };
      swal("Cleared!", "Form Reset!", "info");
}
  ngOnInit() {

  }
  delete(id){
    this.ds.deleteData('/waterTank',id).then((data:any) => {
      // this.greyChecking.splice(i,1);
      //alert("Deleted Successfull");
      swal("Success", "Can not update Transaction Entry", "success");
      this.router.navigate(['dashboard/OtherModule/coalcons']);
      this.route
    },err => {
      console.log(err);
    })
  }
}
