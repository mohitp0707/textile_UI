import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DataServiceService } from '../../../../../provider/data-service.service';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

 
  Roles:any=[];
  ViewRoles:any=[];
  indV:number=0;


  constructor(public ds : DataServiceService, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) { }
  
  getRoles(){
    this.spinnerService.show();
				this.ds.getData('/acountingview').then((data:any) => {
          this.ds.manufRoles=data.recordset || [];
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
