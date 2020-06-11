import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
const swal: SweetAlert = _swal as any;
declare var jQuery: any;
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-addinvoice',
  templateUrl: './addinvoice.component.html',
  styleUrls: ['./addinvoice.component.scss']
})
export class AddinvoiceComponent implements OnInit {

	@ViewChild("focusText") _el: ElementRef;
	product:any;
	// This is form object which we need to submit
	invoice : any = {
		partyId : "",
		generatedDate : new Date,
		category : "sale",
		taxGType:"",
		type : "sale",
		particular : [],
		remark : "",
		subTotal : 0,
		tsgst:0,
		tcgst:0,
		tigst:0,
		taxSubTotal : 0,
		amount : 0,
		paymentStatus:0,
		status:0
	};
	
	// This is single particular
	particular : any = {
		IM_NM : "",
		quantity : 0,
		sellingPrice : 0,
		subTotal : 0,
		sgst:0,
		cgst:0,
		igst:0,
		taxSubTotal : 0,
		amount : 0,
		status:1,
		companyId:1,
		userId:1,
		locationId:1,
		IM_TAX:''
	};
	productList:any=[];
	taxName:string="";
	taxType:string="";
	productTypes:any=[];
	productconfig:any={};
	productTaxDetail:any={};
	dataadded:boolean=true;
	sgst:boolean=false;
	igst:boolean=false;
	party:any=[];
	GodownArr=[];
	issales:boolean=true;
	Retrieve:boolean=false;
	finalresult=[];
	productName=[];
	count:number=0;
	isSaving:boolean=false;
	
	constructor(public ds : DataServiceService, public route : ActivatedRoute, private spinner:Ng4LoadingSpinnerService,private datePipe: DatePipe){
	// Route param for edit data - params.id (which is defined in router config)
		this.invoice.generatedate=new Date();
		route.params.subscribe(params => {
			
			if(params.type){
				this.invoice.category = params.type;
				this.invoice.type = params.type;
				if(params.type=='purchase'){
					this.issales=false;
				}
			}
			if(params.id){		
				if(params.type=='purchase'){
				this.Retrieve=true;
				ds.getData('/Purchase_Retrieve/'+params.id).then((data:any) => {
					if(!data){
						this.ds.invalidForm = true;
						this.ds.errorMessage = "No data found.";
						return ;
						
					}	
						if(data.recordset[0].taxGType=="scgst")
					{
						this.sgst=true;
					}
					else if(data.recordset[0].taxGType=="scgst")
					{
						this.igst=true;
					}
					else
					{
						this.sgst=false;
						this.igst=false;
					}
					this.invoice = data.recordset[0];
					this.invoice.generatedate=new Date(data.recordset[0].generatedate)
					this.invoice.particular=data.recordsets[1];
					this.calculateTotal(this.invoice);
				},err => {
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					console.log(err);
					console.log("fail");
				});
			 }else{
				this.Retrieve=true;
				ds.getData('/retrieve_SI_ALL/'+params.id).then((data:any) => {
					if(!data){
						this.ds.invalidForm = true;
						this.ds.errorMessage = "No data found.";
						return ;
						
					}	
						if(data.recordset[0].taxGType=="scgst")
					{
						this.sgst=true;
					}
					else if(data.recordset[0].taxGType=="scgst")
					{
						this.igst=true;
					}
					else
					{
						this.sgst=false;
						this.igst=false;
					}
					this.invoice = data.recordset[0];
					this.invoice.generatedate=new Date(data.recordset[0].generatedate)
					this.invoice.particular=data.recordsets[1];
					this.calculateTotal(this.invoice);
				},err => {
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					console.log(err);
					console.log("fail");
				});

			 }
			}else{
			if(this.invoice.type=='purchase'){
				this.ds.getData('/Party','vendor').then((data:any) => {
					this.party = data.recordset || [];
					jQuery('.selectpicker').selectpicker();	
					this.getgodown();
					},err => {
						console.log(err);
				})
		}else{
			this.ds.getData('/Party','client').then((data:any) => {
				this.party = data.recordset || [];
				jQuery('.selectpicker').selectpicker();	
				this.getgodown();
				},err => {
					console.log(err);
			})
		}}
		});
}
	getgodown(){
		this.ds.getData('/Godown').then((data:any) => {
			this.GodownArr = data.recordset|| [];
			//console.log(this.GodownArr);
			this.GodownArr= this.GodownArr.filter(product => product.GM_Typ == 'Store Godown');
			
			// this.GodownArr= this.GodownArr.filter(product => product.GM_Typ == 'Raw Godown');
			// console.log(this.GodownArr);
			this.getproduct();
		},err => {
				console.log(err);
		})
	}
	getproduct(){
		this.ds.getData('/InventoryProductInvoice','Grey Material').then((data:any) => {
			this.productList = data.recordset || [];
			if(this.invoice.type='purchase'){
				this.productList  = this.productList.filter(product => product.IM_IFOR == 'purchase'  && product.IM_TYP!='Grey Material');
			}else{
				this.productList  = this.productList.filter(product => product.IM_IFOR == 'sale');
			}
			this.getpructType(); 
		},err => {
			console.log(err);
		})	
	}

	getPartyDet(){
		this.invoice.partyId= jQuery('.selectpicker').find("option:selected").val();
		this.invoice.PM_NAME= jQuery('.selectpicker').find("option:selected").text();
		// this.getBatchNo(this.invoice);
	}

	getpructType(){
		let test:any=[];
		test  = this.productList.filter(product => product.IM_TYP != 'Grey Material');
		let result = test.map(a => a.IM_TYP);
		this.finalresult = result.filter((IM_TYP, i,product) => i === product.indexOf(IM_TYP));
	  }
	  getProductName(typ){
		this.productName  = this.productList.filter(product => product.IM_TYP == typ  && product.IM_TYP != 'Grey Material');
		this.spinner.show();
		setTimeout(function () {
		  jQuery(".selectpicker1").selectpicker("refresh");
		  jQuery('.selectpicker1').selectpicker();
		}, 250);
		this.spinner.hide();
	  }
	  getItemDetails(){
		this.particular.IM_ID= jQuery('.selectpicker1').find("option:selected").val();
		this.particular.IM_NM= jQuery('.selectpicker1').find("option:selected").text();
		let productdetails:any=[];
		productdetails  = this.productName.filter(product => product.IM_ID == this.particular.IM_ID && product.IM_NM==this.particular.IM_NM);
		this.particular.IM_TAX=productdetails[0].IM_TAX;
		this.particular.IM_UM=productdetails[0].IM_UM;
		this.particular.qty=productdetails[0].qty;
		this.getTaxData(this.particular.IM_ID);
	  }
	getTaxData(ProductId){	
		let product = this.productList.filter(item => item.IM_ID === ProductId)[0];
		this.taxType=product.IM_TAXTYP;
		// if(product.config && product.config.tax){
		// // console.log(product.config.tax);
		// this.taxName=product.config.tax.sysName;
		// this.taxType=product.config.tax.taxType;
		// this.productTaxDetail = this.productconfig.tax.filter(prod => prod.value == this.taxName)[0];
		// }
		this.ds.getData('/Taxdetails',product.IM_TAX).then((data:any) => {
			this.productTaxDetail = data.recordset[0] || []; 
		},err => {
			console.log(err);
		})
	}
	verticalSum(array, colname){
		let total = 0;
		array.forEach(item => {
			total += Number(item[colname]);
		});
		return total.toFixed(2);
	}
	// This will calculate verticalSum sum of required cols
	calculateTotal(invoice){
		invoice.subTotal = this.verticalSum(invoice.particular, "subTotal");
		invoice.tsgst=this.verticalSum(invoice.particular, "sgst");
		invoice.tcgst=this.verticalSum(invoice.particular, "cgst");
		invoice.tigst=this.verticalSum(invoice.particular, "igst");
		invoice.taxSubTotal = this.verticalSum(invoice.particular, "taxSubTotal");
		invoice.amount = this.verticalSum(invoice.particular, "amount");
	}
	calculateAmt(particular){


		particular.subTotal = particular.sellingPrice * particular.quantity;
		if(this.taxType=="exclude" && (this.invoice.taxGType=="scgst" || this.invoice.taxGType=="igst" ))
		{
		particular.taxSubTotal = (parseFloat(particular.subTotal) * (parseFloat(this.productTaxDetail.igst)/100)).toFixed(2);
		particular.amount = parseFloat(particular.subTotal) + parseFloat(particular.taxSubTotal);
		}
		else if(this.taxType=="include" && (this.invoice.taxGType=="scgst" || this.invoice.taxGType=="igst" ))
		{
		let res:any=(particular.subTotal / (1 + (this.productTaxDetail.igst / 100))).toFixed(2);
		particular.taxSubTotal=(parseFloat(particular.subTotal)-parseFloat(res)).toFixed(2);
		particular.amount = Number(particular.taxSubTotal)+Number(res);
		particular.subTotal=(parseFloat(particular.amount)-parseFloat(particular.taxSubTotal)).toFixed(2);
		}
		else
		{
			particular.amount=particular.subTotal;
			particular.sgst=0;
			particular.cgst=0;
			particular.igst=0;
			
		}
		if(this.invoice.taxGType=="scgst" && (this.taxType=="include" || this.taxType=="exclude")){
			this.sgst=true;
			this.igst=false;
			let TaxSplit:number=parseFloat(particular.taxSubTotal)/2;
			 particular.sgstp=parseFloat(this.productTaxDetail.igst)/2;
			 particular.cgstp=parseFloat(this.productTaxDetail.igst)/2;
			particular.sgst=TaxSplit.toFixed(2);
			particular.cgst=TaxSplit.toFixed(2);	
			particular.igst=0;	
		}
		else if(this.invoice.taxGType=="igst" && (this.taxType=="include" || this.taxType=="exclude"))
		{
			this.sgst=false;
			this.igst=true;
			 particular.igstp=this.productTaxDetail.igst;
			particular.sgst=0;
			particular.cgst=0;	
			particular.igst=particular.taxSubTotal;	
		}
		else
		{	this.sgst=false;
			this.igst=false;
			particular.igst=0;
			particular.sgst=0;
			particular.cgst=0;
			particular.sgstp=0;
			particular.cgstp=0;	
			particular.igst=0;
			particular.taxSubTotal=0;
		}
	
	}	
	
	show(taxType){
		console.log(taxType);
	}
	
	addParticular(particular){
	
		if(this.particular.quantity<=0 || this.particular.quantity == "" ){
			//alert("Please Insert valid quantity");
			swal("Error!", "Please Insert valid quantity!", "error");
		}else if(this.particular.sellingPrice<=0 || this.particular.sellingPrice == "" ){
			//alert("Please insert valid rate");
			swal("Error!", "Please insert valid rate!", "error");
		}else{
		this.dataadded=false;
		let item = Object.assign({}, particular);
		this.invoice.particular.push(item);
		this._el.nativeElement.focus();
		this.particular={
			IM_NM : "",
			quantity : 0,
			sellingPrice : 0,
			subTotal : 0,
			sgst:0,
			cgst:0,
			igst:0,
			taxSubTotal : 0,
			amount : 0,
			status:1,
			companyId:1,
			userId:1,
			locationId:1,
			IM_TAX:''
		};
		this.calculateTotal(this.invoice);
	}
	}
	removeParticular(index){
		console.log(index);
		this.invoice.particular.splice(index, 1);
		this.calculateTotal(this.invoice);
	}
	
	ngOnInit() { }
	resetForm()
	{
		this.invoice={};
		this.particular={};
		this.invoice.particular=[];	
		this.isSaving=false;
		this.dataadded=false;
		this.invoice.generatedDate=new Date;
	}
	


	submitForm(formName, input){
		if(formName.invalid){
			swal("Error!", "Please Insert Mandetory Field!", "error");
		}
		else if(this.invoice.particular.length<1)
		{
			swal("Error!", "Please Insert Particulars!", "error");
		}
		else{
			if(this.issales==false){
			this.count=this.count+1;
			console.log(this.count);
			if(this.count==1){
			this.isSaving=true;
			//console.log(input);
			input.generatedate = this.datePipe.transform(this.invoice.generatedate, 'yyyy-MM-dd');
			this.ds.postData('/PurchaeInvoice', input).then((data:any) => {
					// this.ds.formSubmitted = true;
					formName.resetForm();
					this.invoice={};
					this.particular={};
					this.invoice.particular=[];	
					this.dataadded=true;
					this.isSaving=false;
					this.issales=false;
					this.invoice.generatedate=new Date();
					this.count=0;
					jQuery(".selectpicker").val('').selectpicker("refresh");
					swal("Success!", "Data Saved Successfully!", "success");
			},err => {
				
				err = err.json();
				console.log(err);
				this.ds.invalidForm = true;
				this.ds.errorMessage = err.error.message;
				console.log(err);
			})
		}
		}else{
			this.count=this.count+1;
			console.log(this.count);
			if(this.count==1){
			this.isSaving=true;
			//console.log(input);
			input.generatedate = this.datePipe.transform(this.invoice.generatedate, 'yyyy-MM-dd');
			this.ds.postData('/SI_ALL_Insert', input).then((data:any) => {
					// this.ds.formSubmitted = true;
					formName.resetForm();
					this.invoice={};
					this.particular={};
					this.invoice.particular=[];	
					this.dataadded=true;
					this.isSaving=false;
					this.invoice.generatedate=new Date();
					this.count=0;
					jQuery(".selectpicker").val('').selectpicker("refresh");
					swal("Success!", "Data Saved Successfully!", "success");
			},err => {
				
				err = err.json();
				console.log(err);
				this.ds.invalidForm = true;
				this.ds.errorMessage = err.error.message;
				console.log(err);
			})
		}
		}
			
		}
	}
}


