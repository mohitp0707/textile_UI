import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import {  Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-dispatchview',
  templateUrl: './dispatchview.component.html',
  styleUrls: ['./dispatchview.component.scss']
})
export class DispatchviewComponent implements OnInit {

  dispatch:any=[];
  delete:boolean;
  p: number = 1;
  update:boolean;
  deleteright:boolean;
  formrights:any=[];
  searchText:any;
  constructor(public ds : DataServiceService,public sp:Ng4LoadingSpinnerService) {
    this.formrights  = ds.Roles.filter(Role => Role.USR_RLINK == 'dispatchview');
    this.deleteright=this.formrights[0].USR_DEL;
    this.update=this.formrights[0].USR_Update;
    
   }

  ngOnInit() {
    this.data();
  }
  data(){
    this.sp.show();
    this.ds.getData('/DispatchView').then((data:any) => {
      // console.log(data);
      this.dispatch = data.recordset || [];
      this.sp.hide();
		},err => {
      console.log(err);
      this.sp.hide();
		})
  }

  buttonState(val){
    console.log(val);
    if(val.DSP_InvStatus==1){
      return true;
    }
  }

  deletedata(id,i){
    this.sp.show();
    this.ds.deleteData('/dispatchdel',id).then((data:any) => {
      // this.greyRecive.splice(i,1);
      this.data();
      this.sp.hide();
      //this.dispatch.splice(i+((this.p-1)*10),1);
    },err => {
      console.log(err);
    })
}

}
