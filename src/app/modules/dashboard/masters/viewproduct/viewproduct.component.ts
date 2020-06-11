import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.scss']
})
export class ViewproductComponent implements OnInit {

	update:boolean;
	delete:boolean;
	formrights:any=[];
	p: number = 1;
    searchText:any;
  constructor(public ds : DataServiceService) { 
  this.getData();
  this.formrights  = ds.manufRoles.filter(Role => Role.USR_RLINK == 'viewparty/vendor');
  // this.delete=this.formrights[0].USR_DEL;
  this.update=this.formrights[0].USR_Update;
  
  }
  productList:any=[];

  ngOnInit() {
  }
	getData(){
		this.ds.getData('/itemMaste').then((data:any) => {
			this.productList = data.recordset || [];
		},err => {
			console.log(err);
		})
	}
	
	deletedata(id, index){
		// this.ds.deleteData('/deleteItem', id).then((data) => {
		// 	if(data){
		// 		alert("delted Successfully");
		// 		this.productList.splice(index, 1);
		// 	}
		// }, err => {
		// 	console.log("Fail");
		// })
		
	}
}
