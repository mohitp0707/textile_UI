import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-masterdahsboard',
  templateUrl: './masterdahsboard.component.html',
  styleUrls: ['./masterdahsboard.component.scss']
})
export class MasterdahsboardComponent implements OnInit {

  constructor(public ds : DataServiceService, public route : ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) { }
  Roles:any=[];
  ViewRoles:any=[];
  indV:number=0;

  ngOnInit() {
    this.getRoles();
  }

  getRoles(){
    this.spinnerService.show();
				this.ds.getData('/mastersRoles').then((data:any) => {
          this.ds.manufRoles=data.recordset || [];
          this.Roles = data.recordset|| [];
          console.log(data.recordset);
          this.ViewRoles  = this.Roles.filter(Role => Role.USR_VIEW == 1);
					this.spinnerService.hide();
				},err => {
						console.log(err);
						this.spinnerService.hide();
				})
  }

}
