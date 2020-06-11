import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../../provider/data-service.service' ;


@Component({
  selector: 'app-stockoutview',
  templateUrl: './stockoutview.component.html',
  styleUrls: ['./stockoutview.component.scss']
})
export class StockoutviewComponent implements OnInit {

  stockOut:any=[];
  constructor(public ds : DataServiceService) { }
  p: number = 1;
  searchText:any;
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
