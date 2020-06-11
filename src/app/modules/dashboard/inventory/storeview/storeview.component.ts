import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-storeview',
  templateUrl: './storeview.component.html',
  styleUrls: ['./storeview.component.scss']
})
export class StoreviewComponent implements OnInit {
  stockOut:any=[];
  update:boolean;
  delete:boolean;
  formrights:any=[];
  p: number = 1;
  searchText:any;
  constructor(public ds : DataServiceService,public sp:Ng4LoadingSpinnerService) {
    this.formrights  = ds.manufRoles.filter(Role => Role.USR_RLINK == 'storeview');
    this.delete=this.formrights[0].USR_DEL;
    this.update=this.formrights[0].USR_Update;
    
   }

  ngOnInit() {
    this.data();
  }
  data(){
    this.sp.show();
    this.ds.getData('/StoreList').then((data:any) => {
      this.stockOut = data.recordset || [];
      this.sp.hide();
  },err => {
      console.log(err);
  })
  }


  deletedata(id,i){
    this.ds.deleteData('/Store_Delete',id).then((data:any) => {
      //this.stockOut.splice(i,1);
      this.data();
    },err => {
      console.log(err);
    })
}

}
