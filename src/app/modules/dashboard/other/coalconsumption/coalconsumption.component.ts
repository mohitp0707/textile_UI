import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-coalconsumption',
  templateUrl: './coalconsumption.component.html',
  styleUrls: ['./coalconsumption.component.scss']
})
export class CoalconsumptionComponent implements OnInit {

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
    machine:"",
		rate:0,
		GR_Date:""
	};
  isValid:boolean=true;
  machine:any=[];
  constructor(public ds : DataServiceService,private datePipe: DatePipe, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService,private router:Router) {
    route.params.subscribe(params => {
      if(!params.id){
        this.spinnerService.show();
      this.invoice.JDate=new Date();
      this.ds.getData('/employee').then((data:any) => {
            this.emplist = data.recordset|| [];
            this.getgodown();
          },err => {
              console.log(err);
              this.spinnerService.hide();
          })
        }else{
          ds.getData('/coalView/'+params.id).then((data:any) => {
            this.spinnerService.show();
            if(!data){
              
              this.ds.invalidForm = true;
              this.ds.errorMessage = "No data found.";
              this.spinnerService.hide();
              return ;
            }
            this.isValid=false;
            this.GodownArr=data.recordsets[2];
            this.invoice=data.recordset[0];
            this.invoice.JDate=new Date(data.recordset[0].JDate);
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
  getProduct(warehouse){
		this.spinnerService.show();
    this.ds.getData('/COALITM',warehouse).then((data:any) => {
      this.productList = data.recordset|| [];
      
			this.spinnerService.hide();
		},err => {
			console.log(err);
			this.spinnerService.hide();
		})
  }
  getgodown(){
		this.ds.getData('/Godown').then((data:any) => {
      this.GodownArr = data.recordset|| [];
      console.log(this.GodownArr);
      this.GodownArr= this.GodownArr.filter(product => product.GM_Typ == 'Store Godown');
			// console.log(this.GodownArr);
			this.getMachine();
		},err => {
				console.log(err);
		})
  }
  
  getMachine(){

    this.spinnerService.show();
    this.ds.getData('/machine').then((data:any) => {
      this.machine = data.recordset|| [];
      this.spinnerService.hide();
    },err => {
      console.log(err);
      this.spinnerService.hide();
    })
  }
  getUnit(detail){
		this.particular.unit=detail;
	}

  ngOnInit() {
  }
  addParticular(particular){
    console.log(particular.machine);
    if(particular.IM_NM=="" || particular.IM_UM=="" || particular.unit==""){
        //alert("please select Item & Unit");
        swal("Error!", "Please select Item & Unit!", "error");
    }else if(particular.quantity=="" || particular.quantity==0){
        //alert("Please insert quantity");
        swal("Error!", "Please insert quantity!", "error");
    }else if(parseFloat(particular.qty)<parseFloat(particular.quantity)){
      //alert("stock is not available availabe stock is"+particular.qty);
      swal("Error!", "stock is not available availabe stock is!"+particular.qty, "error");
    }else if(particular.machine==""){
      //alert("Please select Machine");
      swal("Error!", "Please select Machine!", "error");
    }
    else{
      let item = Object.assign({}, particular);

      // this.particular.q
      this.particular={};
      this.particular.quantity=1;
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
saveForm(formName,input){
  this.route.params.subscribe(params => {
    if(!params.id){
  this.spinnerService.show();
  if(formName.invalid==true){
   // alert("Please fill require filled");
    swal("Error!", "Please fill require filled!", "error");
    this.spinnerService.hide();
  }else if(this.invoice.RecQtyList.length<=0){
   // alert("Please insert item");
    swal("Error!", "Please insert item!", "error");
    this.spinnerService.hide();
  }else if(this.invoice.GR_WH==""){
    //alert("Please select warehouse");
    swal("Error!", "Please select warehouse!", "error");
    this.spinnerService.hide();
  }
  else
  {
    input.GR_Date = this.datePipe.transform(this.invoice.GR_Date, 'yyyy-MM-dd');
    input.JDate = this.datePipe.transform(this.invoice.JDate, 'yyyy-MM-dd');
  this.ds.postData('/COALINSERT', input).then((data:any) => {
      this.ds.formSubmitted = true;
      formName.resetForm();
      this.invoice={};
      this.invoice.GR_Date=new Date();
      this.invoice.JDate=new Date();
      this.particular={		IM_NM : "", unit : "",quantity:0,rate:0 };
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
    swal("Error!", "can not update Transaction Entry!", "error");
  }
});
}
reset(){
  this.invoice={};
  this.invoice.GR_Date=new Date();
  this.invoice.JDate=new Date();
  this.particular={		IM_NM : "", unit : "",quantity:0,rate:0 };
  this.invoice.RecQtyList=[];
  swal("Cleared!", "Form Reset!", "info");
}
    delete(id){
      this.ds.deleteData('/coalDel',id).then((data:any) => {
        // this.greyChecking.splice(i,1);
        //alert("Deleted Successfull");
        swal("Deleted", "Deleted Successfull!", "success");
        this.router.navigate(['dashboard/OtherModule/coalcons']);
        this.route
      },err => {
        console.log(err);
      })
    }
}
