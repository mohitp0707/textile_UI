import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../../provider/data-service.service';

@Component({
  selector: 'app-viewmeeting',
  templateUrl: './viewmeeting.component.html',
  styleUrls: ['./viewmeeting.component.scss']
})
export class ViewmeetingComponent implements OnInit {

	meetingList : any = [];
	
	constructor(public ds : DataServiceService){
		this.getData();
	}
	
	// To fetch data from server and display into grid/table
	getData(){
		this.ds.getData('/Society_Meetings').then(data => {
			this.meetingList = data || [];
			console.log(this.meetingList);
		},err => {
			console.log(err);
		})
	}
	
	ngOnInit() {
	}

deletedata(id, index){
		console.log(id);
		this.ds.deleteData('/Society_Meetings', id).then((data) => {
			
			if(data){
				this.meetingList.splice(index, 1);
			}
		}, err => {
			console.log("Fail");
		})
	}
}
