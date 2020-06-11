import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
declare var jQuery: any;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stocksettlement',
  templateUrl: './stocksettlement.component.html',
  styleUrls: ['./stocksettlement.component.scss']
})
export class StocksettlementComponent implements OnInit {
  @ViewChild("focusText") _el: ElementRef;
  product:any;
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
  emplist:any=[];
  isValid:boolean=true;
  GodownArr:any=[];
  RecQtyList:any=[];
  particular : any = {
    IM_ID:"",
    quantity : 0.000,
    inqty:0.00,
    unit :""
};

productList:any=[];
finalresult=[];
productName:any[];
retrieve:boolean=false;

  constructor(public ds : DataServiceService,private datePipe: DatePipe, public route : ActivatedRoute,private router:Router,private spinnerService: Ng4LoadingSpinnerService) { 
    route.params.subscribe(params => {
			if(!params.id){
            this.invoice.JDate=new Date();
            this.getEmployee();
      }else{
        this.retrieve=true;
        ds.getData('/StockSettleRet/'+params.id).then((data:any) => {
					this.spinnerService.show();
					if(!data){
						this.ds.invalidForm = true;
						this.ds.errorMessage = "No data found.";
						this.spinnerService.hide();
						return ;
					}
          this.invoice.JDate=data.recordset[0].JDate;
					this.invoice=data.recordset[0];
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
    });
  }

  ngOnInit() {
    
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
      this.GodownArr= this.GodownArr.filter(product => product.GM_Typ == 'Store Godown');
      // console.log(this.GodownArr);
      // this.getProduct();
    },err => {
        console.log(err);
    })
  }

  addParticular(particular){
    console.log(particular);
    if(particular.IM_NM=="" || particular.IM_UM==""){
       // alert("please select Item & Unit");
        swal("Error!", "Please select Item & Unit!", "error");
    }else if(particular.quantity=="" || particular.quantity==0){
       // alert("Please insert quantity");
        swal("Error!", "Please insert quantity!", "error");
    }else if(particular.inqty<particular.quantity){
      swal("Error!", "value not greater than total Stock'"+particular.inqty+"'!" , "error");
    }
    // else if(particular.aqty<particular.quantity){
    //   alert("stock is not available availabe stock is "+particular.aqty);
    // }
    else{
      let item = Object.assign({}, particular);

      this.particular={ IM_TYP:item.IM_TYP,IM_ID:"",IM_NM:"",quantity : 1, unit :item.unit };
      this.particular.quantity=1;
      this.invoice.RecQtyList.push(item);
      this._el.nativeElement.focus();
   
  }
}
getUnit(detail){
  this.particular.unit=detail.IM_UM;
  this.particular.quantity=0.000;
  this.particular.aqty=detail.qty;
}
removeParticular(index){
this.invoice.RecQtyList.splice(index, 1);
}
getProduct(){
  this.spinnerService.show();
  this.finalresult=[];
  let data:any={};
  console.log(this.invoice.PCK_WH);
  data.GR_WH=this.invoice.PCK_WH;
  // data.GR_Date=this.invoice.JDate;
  data.GR_Date = this.datePipe.transform(this.invoice.JDate, 'yyyy-MM-dd');
  // console.log(data);
  this.ds.getData('/Inventory_ProductsWithdate',data).then((data:any) => {
    this.productList = data.recordset|| [];
    this.spinnerService.hide();
    this.getpructType();
  },err => {
    console.log(err);
    this.spinnerService.hide();
  })
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
  this.particular.inqty=productdetails[0].inqty;
  this.particular.qty=productdetails[0].qty;
  this.getUnit(this.particular);
}
saveForm(frm,data){
  // console.log(data);
  this.spinnerService.show();
  if(frm.invalid==true){
    //alert("please Fill Mandetory Fields");
    swal("Error!", "Please Fill Mandetory Fields!", "error");
    this.spinnerService.hide();
  }
  else if(this.invoice.RecQtyList.length<=0){
    //alert("Please Insert item in list");
    swal("Error!", "Please Insert item in list!", "error");
    this.spinnerService.hide();
  }
  else{
    this.invoice.JDate = this.datePipe.transform(this.invoice.JDate, 'yyyy-MM-dd');
      this.ds.postData('/stockSettlement', this.invoice).then((data:any) => {
        this.ds.formSubmitted = true;
        frm.resetForm();
        this.invoice={};
        this.invoice.RecQtyList=[];
        this.invoice.JDate=new Date();
        this.particular={ IM_NM : "",quantity:0,cquantity:0};
        // this.ds.submittedMessage = "Form submitted Successfully.";
        setTimeout(function () {
					jQuery(".selectpicker").val('').selectpicker("refresh");
				  }, 250);
        swal("Success!", "Data Saved Successfully!", "success");
        this.spinnerService.hide();
      },err => {
        err = err.json();
        this.ds.invalidForm = true;
        this.ds.errorMessage = err.error.message;
        console.log(err);
        this.spinnerService.hide();
      })

    } 
  } 
  reset(){
    this.invoice={};
        this.invoice.RecQtyList=[];
        this.invoice.JDate=new Date();
        this.particular={IM_NM : "", quantity:0,cquantity:0};
        // this.ds.submittedMessage = "Form submitted Successfully.";
        setTimeout(function () {
					jQuery(".selectpicker").val('').selectpicker("refresh");
				  }, 250);
				  swal("Cleared!", "Form Reset", "info");
  }

    delete(){
     
      this.ds.deleteData('/stockSettlementdel',this.invoice.STKST_ID).then((data:any) => {
        // alert("delete Sucessfully");
        this.router.navigate(['dashboard/stock/stocksettle']);
      },err => {
        console.log(err);
      })
    }
}


