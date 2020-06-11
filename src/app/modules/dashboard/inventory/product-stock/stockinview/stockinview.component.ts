import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-stockinview',
  templateUrl: './stockinview.component.html',
  styleUrls: ['./stockinview.component.scss']
})
export class StockinviewComponent implements OnInit {

    stockIn:any=[];
    p: number = 1;
    searchText:any;
  constructor(public ds : DataServiceService,public sp:Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.data();
  }
  data(){
    this.sp.show();
    this.ds.getData('/StockInList').then((data:any) => {
      this.stockIn = data.recordset || [];
      this.sp.hide();
  },err => {
      console.log(err);
  })
  }


  deletedata(id,i){
    this.ds.deleteData('/StockInId',id).then((data:any) => {
      // this.stockIn.splice(i,1);
      this.data();
    },err => {
      console.log(err);
    })
}
}
