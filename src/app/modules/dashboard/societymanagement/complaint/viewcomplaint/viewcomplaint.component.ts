import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../../provider/data-service.service' ;

@Component({
  selector: 'app-viewcomplaint',
  templateUrl: './viewcomplaint.component.html',
  styleUrls: ['./viewcomplaint.component.scss']
})
export class ViewcomplaintComponent implements OnInit {


	complaintList : any = [];
	
	constructor(public ds : DataServiceService) { 
		this.getData();
	}
	// To fetch data from server and display into grid/table
		getData(){
		this.ds.getData('/Society_Complaints').then(data => {
			this.complaintList = data || [];
			console.log(this.complaintList);
		},err => {
			console.log(err);
		})
	}
	
	ngOnInit() {
	}
	
	deletedata(id, index){
		console.log(id);
		this.ds.deleteData('/Society_Complaints', id).then((data) => {
			
			if(data){
				this.complaintList.splice(index, 1);
			}
		}, err => {
			console.log("Fail");
		})
	}
}
