import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;


@Component({
  selector: 'app-stockoutview',
  templateUrl: './stockoutview.component.html',
  styleUrls: ['./stockoutview.component.scss']
})
export class StockoutviewComponent implements OnInit {

  stockOut:any=[];
  update:boolean;
  delete:boolean;
  formrights:any=[];
  p: number = 1;
  searchText:any;
  constructor(public ds : DataServiceService) {
    this.formrights  = ds.manufRoles.filter(Role => Role.USR_RLINK == 'stockoutview');
    // console.log(this.formrights);
    this.delete=this.formrights[0].USR_DEL;
    this.update=this.formrights[0].USR_Update;
   }

  ngOnInit() {
    this.data();
  }
  data(){
      this.ds.getData('/StockOutList').then((data:any) => {
        this.stockOut = data.recordset || [];
        },err => {
      console.log(err);
    })
  }


  deletedata(id,i){
    this.ds.deleteData('/StockOutId',id).then((data:any) => {
     // this.stockOut.splice(i,1);
     this.data();
    },err => {
      console.log(err);
    })
}

}
