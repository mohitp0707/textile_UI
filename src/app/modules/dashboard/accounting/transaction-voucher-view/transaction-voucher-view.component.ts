import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service';

@Component({
  selector: 'app-transaction-voucher-view',
  templateUrl: './transaction-voucher-view.component.html',
  styleUrls: ['./transaction-voucher-view.component.scss']
})
export class TransactionVoucherViewComponent implements OnInit {

	invoiceList : any = [];
	ispayment:boolean=true;
	p: number = 1;
	searchText:any;
	constructor(public ds : DataServiceService, public route : ActivatedRoute){
		route.params.subscribe(params => {
			console.log(params.type);
			if(params.type){
				// this.invoice.category = params.type;
				// this.invoice.type = params.type;
				if(params.type=='payment'){
					this.ispayment=true;
				}else{
					this.ispayment=false;
				}
			}
			})
		this.getData();
	}
	
	
		getData(){
		if(this.ispayment==true){
			this.ds.getData('/voucherPaymentretrieve').then((data:any) => {
        this.invoiceList = data.recordset || [];
				},err => {
				console.log(err);
			})
		}else{
			this.ds.getData('/voucherRecieptretrieve').then((data:any) => {
				this.invoiceList = data.recordset || [];
				},err => {
				console.log(err);
			})
		}
		
		
	}
	deletedata(invoice, index){
    let data:any={};
    data.id=invoice.id;
    data.party=invoice.PAYEE;
    data.amount=invoice.amt
    console.log(data);
    var conf = confirm("Are you sure?");
    if(!conf){
      return;
    }
	if(this.ispayment==true){
		this.ds.getData('/voucherpaymentdel', data).then((data) => {
			if(data){
				this.invoiceList.splice(index, 1);
				alert("deleted Sucessfully");
      }
      console.log(data);
		}, err => {
			console.log("Fail");
		})
	 }else{
		this.ds.getData('/voucherrecieptdel', data).then((data) => {
			if(data){
				this.invoiceList.splice(index, 1);
				alert("deleted Sucessfully");
			}
		}, err => {
			console.log("Fail");
		})
	 }
	}	
	
	ngOnInit() {
		
	}

}
