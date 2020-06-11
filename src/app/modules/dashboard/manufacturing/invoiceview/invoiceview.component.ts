import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;


@Component({
  selector: 'app-invoiceview',
  templateUrl: './invoiceview.component.html',
  styleUrls: ['./invoiceview.component.scss']
})
export class InvoiceviewComponent implements OnInit {

  p: number = 1;
  invoiceview:any=[];
  update:boolean;
  delete:boolean;
  formrights:any=[];
  searchText:any;
  serdat:any;
  sersupp:any;
  serinvNo:any;
  serdcNo:any;
  sertrans:any;
  serlrNo:any;
  sertaxtyp:any;
  sertpcs:any;
  sermtr:any;
  sertax:any;
  seramt:any;


  constructor(public ds : DataServiceService) { 
    this.formrights  = ds.Roles.filter(Role => Role.USR_RLINK == 'invoiceview');
    this.update=this.formrights[0].USR_DEL;
  }

  ngOnInit() {
    this.ds.getData('/invoiceView').then((data:any) => {
      this.invoiceview = data.recordset || [];
		},err => {
			console.log(err);
		})
  }

}
