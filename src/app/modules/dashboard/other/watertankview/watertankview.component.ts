import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-watertankview',
  templateUrl: './watertankview.component.html',
  styleUrls: ['./watertankview.component.scss']
})
export class WatertankviewComponent implements OnInit {

  watetank:any=[];
  update:boolean;
  delete:boolean;
  formrights:any=[];
  p: number = 1;
  searchText:any;

  constructor(public ds : DataServiceService,public sp:Ng4LoadingSpinnerService) {
    this.formrights  = ds.manufRoles.filter(Role => Role.USR_RLINK == 'watertank');
    this.delete=this.formrights[0].USR_DEL;
    this.update=this.formrights[0].USR_Update;
   }

  ngOnInit() {
    this.data();
  }
  data(){
    this.sp.show();
    this.ds.getData('/waterTankview').then((data:any) => {
      this.watetank = data.recordset || [];
      this.sp.hide();
		},err => {
      this.sp.hide();
			console.log(err);
		})
  }

}
