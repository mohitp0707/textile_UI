import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class DbServicesService {
	
	customer:any=[];
	supplier:any=[];
	product:any=[];

  constructor() {
	
	
	// let filterParams = 'Client'
		// this.ds.getData('/Party', filterParams).then((data:any) => {
			
			// this.customer = data.recordset || [];
		
		// },err => {
			// console.log(err);
		// })
  
   // getSupplier(){
  // let filterParams = 'Vendor'
		// this.ds.getData('/Party', filterParams).then((data:any) => {
			
			// this.supplier = data.recordset || [];
		
		// },err => {
			// console.log(err);
		// })
  // }
		
  }
  
 

}
