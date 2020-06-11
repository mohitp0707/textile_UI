import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;


@Component({
  selector: 'app-transportview',
  templateUrl: './transportview.component.html',
  styleUrls: ['./transportview.component.scss']
})
export class TransportviewComponent implements OnInit {
  partyList : any = [];
  update:boolean;
  delete:boolean;
  formrights:any=[];
  p: number = 1;
    searchText:any;

	constructor(public ds : DataServiceService, public route : ActivatedRoute) {
		route.params.subscribe(params => {
			this.getData();
		})
	    this.formrights  = ds.manufRoles.filter(Role => Role.USR_RLINK == 'trasnportview');
    	this.delete=this.formrights[0].USR_DEL;
    	this.update=this.formrights[0].USR_Update;
	}

	getData(){
		this.ds.getData('/TransportAll').then((data:any) => {
			this.partyList = data.recordset || [];
		
		},err => {
			console.log(err);
		})
	}
	ngOnInit() {
	}

	deletedata(id, index){
		this.ds.deleteData('/Accounting_Parties', id).then((data) => {
			if(data){
				this.partyList.splice(index, 1);
			}
		}, err => {
			console.log("Fail");
		})
	}	

}
