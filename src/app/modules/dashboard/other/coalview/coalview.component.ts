import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-coalview',
  templateUrl: './coalview.component.html',
  styleUrls: ['./coalview.component.scss']
})
export class CoalviewComponent implements OnInit {

    update:boolean;
    delete:boolean;
    formrights:any=[];
    p: number = 1;
    searchText:any;
  constructor(public ds : DataServiceService,public sp:Ng4LoadingSpinnerService) {
    this.formrights  = ds.manufRoles.filter(Role => Role.USR_RLINK == 'coalcons');
    this.delete=this.formrights[0].USR_DEL;
    this.update=this.formrights[0].USR_Update;
   }

  coaldetails:any=[];

  ngOnInit() {
    this.data();
  }
  data(){
    this.sp.show();
    this.ds.getData('/coalView').then((data:any) => {
      this.coaldetails = data.recordset || [];
      this.sp.hide();
		},err => {
      this.sp.hide();
			console.log(err);
		})
  }

}
