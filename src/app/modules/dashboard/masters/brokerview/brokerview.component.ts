import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataServiceService } from '../../../../provider/data-service.service' ;


@Component({
  selector: 'app-brokerview',
  templateUrl: './brokerview.component.html',
  styleUrls: ['./brokerview.component.scss']
})
export class BrokerviewComponent implements OnInit {

	partyList : any = [];
	update:boolean;
	delete:boolean;
	formrights:any=[];
	p: number = 1;
    searchText:any;

	constructor(public ds : DataServiceService, public route : ActivatedRoute) {
		route.params.subscribe(params => {
			this.getData(params.type);
		})
		this.formrights  = ds.manufRoles.filter(Role => Role.USR_RLINK == 'brokerview');
		this.delete=this.formrights[0].USR_DEL;
		this.update=this.formrights[0].USR_Update;
	}

	
	
// To fetch data from server and display into grid/table
	getData(type){
		let filterParams = type		
		this.ds.getData('/BrokerList', filterParams).then((data:any) => {
			this.partyList = data.recordset || [];
		
		},err => {
			console.log(err);
		})
	}
	
	ngOnInit() {
	}

	deletedata(id, index){

	}	

}
