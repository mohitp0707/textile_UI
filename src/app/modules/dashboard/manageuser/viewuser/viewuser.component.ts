import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent implements OnInit
{
	userList : any = [];
	
	constructor(public ds : DataServiceService) {
		this.getData();
	}
	
	// To fetch data from server and display into grid/table
	getData(){
		this.ds.getData('/users').then(data => {
			this.userList = data || [];
			console.log(this.userList);
		},err => {
			console.log(err);
		})
	}
	
	ngOnInit() {
	}
	
	deletedata(id, index){
		console.log(id);
		this.ds.deleteData('/users', id).then((data) => {
			
			if(data){
				this.userList.splice(index, 1);
			}
		}, err => {
			console.log("Fail");
		})
	}
}
