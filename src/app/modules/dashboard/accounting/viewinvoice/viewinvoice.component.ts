import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { DataServiceService } from '../../../../provider/data-service.service';

@Component({
  selector: 'app-viewinvoice',
  templateUrl: './viewinvoice.component.html',
  styleUrls: ['./viewinvoice.component.scss']
})
export class ViewinvoiceComponent implements OnInit {

	invoiceList : any = [];
	issales:boolean=true;
	p: number = 1;
	searchText:any;
	constructor(public ds : DataServiceService, public route : ActivatedRoute){
		route.params.subscribe(params => {
			console.log(params.type);
			if(params.type){
				// this.invoice.category = params.type;
				// this.invoice.type = params.type;
				if(params.type=='purchase'){
					this.issales=false;
				}
			}
			})
		this.getData();
	}
	
	
		getData(){
		if(this.issales==false){
			this.ds.getData('/Purchase_Retrieve').then((data:any) => {
				this.invoiceList = data.recordset || [];
				},err => {
				console.log(err);
			})
		}else{
			this.ds.getData('/Sales_ALL_Retrieve').then((data:any) => {
				this.invoiceList = data.recordset || [];
				},err => {
				console.log(err);
			})
		}
		
		
	}
	deletedata(id, index){
		console.log(id);
		if(this.issales==false){
		this.ds.deleteData('/deletePurchaseInv', id).then((data) => {
			if(data){
				this.invoiceList.splice(index, 1);
				alert("deleted Sucessfully");
			}
		}, err => {
			console.log("Fail");
		})
	 }else{
		this.ds.deleteData('/delete_SI_ALL', id).then((data) => {
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