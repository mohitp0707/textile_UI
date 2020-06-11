import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../../provider/data-service.service' ;

@Component({
  selector: 'app-invoicereturn',
  templateUrl: './invoicereturn.component.html',
  styleUrls: ['./invoicereturn.component.scss']
})
export class InvoicereturnComponent implements OnInit {

  constructor(public ds : DataServiceService, public route : ActivatedRoute) {
	  this.getInvoiceId();
	  
  }

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
	
	InId:any=[];
  	dataadded:boolean=false;
	sgst:boolean=false;
	igst:boolean=false;
	
	
  ngOnInit() {
  }
  
  		getInvoiceId(){
		this.ds.getData('/Accounting_Invoices').then(data => {
			
			this.InId = data || [];
		},err => {
			console.log(err);
		})	
	}
	
	getInvoicedetail(id){
	
			this.ds.getData('/Accounting_Invoices/'+id).then((data:any) => {
					if(!data){
					
						this.ds.invalidForm = true;
						this.ds.errorMessage = "No data found.";
						return ;
						// console.log(data);
					}
					
					if(data.taxGType=="scgst")
					{
						this.sgst=true;
					}
					else if(data.taxGType=="scgst")
					{
						this.igst=true;
					}
					else
					{
						this.sgst=false;
						this.igst=false;
					}
				this.ds.getData('/Accounting_Invoices/'+id+'/inventoryStocks').then(data2 => {
					if(!data2){
					
						this.ds.invalidForm = true;
						this.ds.errorMessage = "No data found.";
						return ;
						// console.log(data2);
					}
					
					this.invoice.particular=data2;
				},
					err2 => {
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					console.log(err2);
					console.log("fail");
				});	
					
					delete this.invoice.particular;
					delete this.invoice.id;
					
					// Assign single data to form object
					
					this.invoice = data;	
					
					// this.calculateTotal(this.invoice);
				},err => {
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					console.log(err);
					console.log("fail");
				});
		
		
	}
	
		verticalSum(array, colname){
		let total = 0;
		array.forEach(item => {
			total += Number(item[colname]);
		});
		return total.toFixed(2);
	}
	
		removeParticular(index){
		console.log(index);
		this.invoice.particular.splice(index, 1);
		this.calculateTotal(this.invoice);
	}
	
		calculateTotal(invoice){
		invoice.subTotal = this.verticalSum(invoice.particular, "subTotal");
		invoice.tsgst=this.verticalSum(invoice.particular, "sgst");
		invoice.tcgst=this.verticalSum(invoice.particular, "cgst");
		invoice.tigst=this.verticalSum(invoice.particular, "igst");
		invoice.taxSubTotal = this.verticalSum(invoice.particular, "taxSubTotal");
		invoice.amount = this.verticalSum(invoice.particular, "amount");
	}

}
