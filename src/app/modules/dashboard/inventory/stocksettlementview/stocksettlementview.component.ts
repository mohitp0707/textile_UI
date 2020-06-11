import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;

@Component({
  selector: 'app-stocksettlementview',
  templateUrl: './stocksettlementview.component.html',
  styleUrls: ['./stocksettlementview.component.scss']
})
export class StocksettlementviewComponent implements OnInit {

  stocksettle:any=[];
  update:boolean;
  delete:boolean;
  formrights:any=[];
  p: number = 1;
  searchText:any;
  constructor(public ds : DataServiceService) {
    this.formrights  = ds.manufRoles.filter(Role => Role.USR_RLINK == 'stocksettleview');
    this.delete=this.formrights[0].USR_DEL;
    this.update=this.formrights[0].USR_Update;
   }

  ngOnInit() {
    this.getdata();
  }
  getdata(){
    this.ds.getData('/StockSettleRet').then((data:any) => {
			this.stocksettle = data.recordset || [];
		},err => {
			console.log(err);
		})
  }
  deletedata(id,i){
    this.ds.deleteData('/stockSettlementdel',id).then((data:any) => {
     // this.stockOut.splice(i,1);
      this.getdata();
    },err => {
      console.log(err);
    })

}

}
