import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../../provider/data-service.service' ;

@Component({
  selector: 'app-viewaccount',
  templateUrl: './viewaccount.component.html',
  styleUrls: ['./viewaccount.component.scss']
})
export class ViewaccountComponent implements OnInit {

	accountData : any = [];
	
	constructor(public ds : DataServiceService) { 
		this.getData(); 
		}

	getData(){
		this.ds.getData('/Accounting_Accounts').then(data => {
			this.accountData = data || [];
		},err => {
			console.log(err);
		})
	}
	
	ngOnInit() {
	}
	
	deletedata(id, index){
		console.log(id);
		this.ds.deleteData('/Accounting_Accounts', id).then((data) => {
			console.log(data);
			if(data){
				this.accountData.splice(index, 1);
			}
		}, err => {
			console.log("Fail");
		})
	}
}
