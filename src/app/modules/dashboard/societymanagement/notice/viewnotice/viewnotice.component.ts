import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../../provider/data-service.service';
@Component({
  selector: 'app-viewnotice',
  templateUrl: './viewnotice.component.html',
  styleUrls: ['./viewnotice.component.scss']
})
export class ViewnoticeComponent implements OnInit {
noticeList : any = [];
  constructor(public ds : DataServiceService) {
	  this.getData(); 
	  }
			getData(){
					this.ds.getData('/Society_Notices').then(data => {
						this.noticeList = data || [];
						console.log(this.noticeList);
					},err => {
						console.log(err);
					})
				}
  ngOnInit() {
  }
  deletedata(id, index){
		console.log(id);
		this.ds.deleteData('/Society_Notices', id).then((data) => {
			
			if(data){
				this.noticeList.splice(index, 1);
			}
		}, err => {
			console.log("Fail");
		})
	}

}
