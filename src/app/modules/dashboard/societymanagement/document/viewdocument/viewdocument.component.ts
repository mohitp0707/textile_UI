import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../../provider/data-service.service' ;

@Component({
  selector: 'app-viewdocument',
  templateUrl: './viewdocument.component.html',
  styleUrls: ['./viewdocument.component.scss']
})
export class ViewdocumentComponent implements OnInit {


	documentList : any = [];
	
	constructor(public ds : DataServiceService){
		this.getData();
	}	
	// To fetch data from server and display into grid/table
	getData(){
	this.ds.getData('/Society_Documents').then(data => {
		this.documentList = data || [];
		console.log(this.documentList);
		},err => {
			console.log(err);
		})
	}
	
		
	ngOnInit() {
	}
	
	deletedata(id, index){
		console.log(id);
		this.ds.deleteData('/Society_Documents', id).then((data) => {
			
			if(data){
				this.documentList.splice(index, 1);
			}
		}, err => {
			console.log("Fail");
		})
	}
	
}
