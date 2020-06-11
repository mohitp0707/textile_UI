import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;

@Component({
  selector: 'app-viewstorage',
  templateUrl: './viewstorage.component.html',
  styleUrls: ['./viewstorage.component.scss']
})
export class ViewstorageComponent implements OnInit {

	update:boolean;
	delete:boolean;
	formrights:any=[];
	p: number = 1;
	searchText:any;
  constructor(public ds : DataServiceService) {
	this.formrights  = ds.manufRoles.filter(Role => Role.USR_RLINK == 'viewstorage');
    this.delete=this.formrights[0].USR_DEL;
    this.update=this.formrights[0].USR_Update;
   }

  Storage:any=[];
  
  ngOnInit() {
	  this.getData();
  }

  
  getData(){
		this.ds.getData('/Godown').then((data:any) => {
			this.Storage = data.recordset || [];
		},err => {
			console.log(err);
		})		
	}
	
	deletedata(id, index){

	}
}
