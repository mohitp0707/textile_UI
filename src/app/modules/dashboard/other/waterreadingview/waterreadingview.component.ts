import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-waterreadingview',
  templateUrl: './waterreadingview.component.html',
  styleUrls: ['./waterreadingview.component.scss']
})
export class WaterreadingviewComponent implements OnInit {

  watreading:any=[];
  update:boolean;
  delete:boolean;
  formrights:any=[];
  p: number = 1;
searchText:any;

  constructor(public ds : DataServiceService,public sp:Ng4LoadingSpinnerService) {
    this.formrights  = ds.manufRoles.filter(Role => Role.USR_RLINK == 'waterreading');
    this.delete=this.formrights[0].USR_DEL;
    this.update=this.formrights[0].USR_Update;
   }

  ngOnInit() {
    this.data();
  }
  data(){
    this.sp.show();
    this.ds.getData('/waterReadview').then((data:any) => {
      this.watreading = data.recordset || [];
      this.sp.hide();
		},err => {
			console.log(err);
		})
  }

}
