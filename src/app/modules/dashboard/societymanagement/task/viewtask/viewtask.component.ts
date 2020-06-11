import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../../provider/data-service.service' ;

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.scss']
})
export class ViewtaskComponent implements OnInit {


	taskList : any = [];
	
	constructor(public ds : DataServiceService) {
		this.getData();
	}

	// To fetch data from server and display into grid/table
	getData(){
		this.ds.getData('/Society_Tasks').then(data => {
			this.taskList = data || [];
			console.log(this.taskList);
		},err => {
			console.log(err);
		})
	}
	
	ngOnInit() {
	}

	deletedata(id, index){
		console.log(id);
		this.ds.deleteData('/Society_Tasks', id).then((data) => {
			
			if(data){
				this.taskList.splice(index, 1);
			}
		}, err => {
			console.log("Fail");
		})
	}
}
