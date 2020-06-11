import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  Roles:any=[];
  ViewRoles:any=[];
  indV:number=0;


  constructor(public ds : DataServiceService, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) { }
  
  getRoles(){
    this.spinnerService.show();
				this.ds.getData('/stockmove').then((data:any) => {
          this.ds.manufRoles=data.recordset || [];
          this.Roles = data.recordset|| [];
          this.ViewRoles  = this.Roles.filter(Role => Role.USR_VIEW == 1);
          console.log(this.ViewRoles );
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
