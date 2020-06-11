import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;

@Component({
  selector: 'app-employeeview',
  templateUrl: './employeeview.component.html',
  styleUrls: ['./employeeview.component.scss']
})
export class EmployeeviewComponent implements OnInit {

  employeeList:any=[];
  update:boolean;
  delete:boolean;
  formrights:any=[];
  p: number = 1;
  searchText:any;

  constructor(public ds : DataServiceService) { 
    this.formrights  = ds.manufRoles.filter(Role => Role.USR_RLINK == 'employeeview');
    this.delete=this.formrights[0].USR_DEL;
    this.update=this.formrights[0].USR_Update;
  }

  ngOnInit() {
    this.ds.getData('/employeeList').then((data:any) => {
			this.employeeList = data.recordset || [];
		
		},err => {
			console.log(err);
		})
  }

}
