import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-manufacturing',
  templateUrl: './manufacturing.component.html',
  styleUrls: ['./manufacturing.component.scss']
})
export class ManufacturingComponent implements OnInit {

  Roles:any=[];
  ViewRoles:any=[];
  indV:number=0;


  constructor(public ds : DataServiceService, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) { }
  
  getRoles(){
    this.spinnerService.show();
				this.ds.getData('/manfuringRole').then((data:any) => {
          this.ds.Roles=data.recordset || [];
          console.log(this.ds.Roles);
          this.Roles = data.recordset|| [];
          this.ViewRoles  = this.Roles.filter(Role => Role.USR_VIEW == 1);
					this.spinnerService.hide();
				},err => {
						console.log(err);
						this.spinnerService.hide();
				})
  }

  ngOnInit() { 
    this.getRoles();
  }

}
