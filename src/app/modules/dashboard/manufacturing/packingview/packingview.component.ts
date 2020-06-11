import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-packingview',
  templateUrl: './packingview.component.html',
  styleUrls: ['./packingview.component.scss']
})
export class PackingviewComponent implements OnInit {

  process:any=[];
  p: number = 1;
  update:boolean;
  delete:boolean;
  formrights:any=[];
  searchText:any;
  constructor(public ds : DataServiceService,private router:Router,public sp:Ng4LoadingSpinnerService) {
    this.data();
    this.formrights  = ds.Roles.filter(Role => Role.USR_RLINK == 'packingview');
    this.update=this.formrights[0].USR_Update;
    this.delete=this.formrights[0].USR_DEL;

   }

   data(){
     this.sp.show();
    this.ds.getData('/PackingDetails').then((data:any) => {
      this.process = data.recordset || [];
      this.sp.hide();
		},err => {
      console.log(err);
      this.sp.hide();
		})
   }


  ngOnInit() {
  
  }

  buttonState(val){
    if(val.PCK_ISdispatch=='1'){
      return true;
    }
  }

  deletedata(id,i){
    this.ds.deleteData('/Packing',id).then((data:any) => {
     // this.process.splice(i,1);
     this.data();
    },err => {
      console.log(err);
    })
  }



}
