import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../../provider/data-service.service' ;

@Component({
	selector: 'app-viewhouse',
	templateUrl: './viewhouse.component.html',
	styleUrls: ['./viewhouse.component.scss']
})
export class ViewhouseComponent implements OnInit {
	
	FlatData : any = [];
	
	constructor(public ds : DataServiceService) {
		this.getData();
		
	}
	
	// To fetch data from server and display into grid/table
	getData(){
		this.ds.getData('/Society_Houses').then(data => {
			this.FlatData = data || [];
			console.log(this.FlatData);
		},err => {
			console.log(err);
		})
	}
	
	ngOnInit() {
	}
	
	deletedata(id, index){
		console.log(id);
		this.ds.deleteData('/Society_Houses', id).then((data) => {
			console.log(data);
			if(data){
				this.FlatData.splice(index, 1);
			}
		}, err => {
			console.log("Fail");
		})
	}
	
	
}
