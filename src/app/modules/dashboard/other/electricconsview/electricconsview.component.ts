import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-electricconsview',
  templateUrl: './electricconsview.component.html',
  styleUrls: ['./electricconsview.component.scss']
})
export class ElectricconsviewComponent implements OnInit {

  electric:any=[];
  update:boolean;
  delete:boolean;
  searchText:any;
  p: number = 1;
  formrights:any=[];
  constructor(public ds : DataServiceService,public sp:Ng4LoadingSpinnerService) { 
    this.formrights  = ds.manufRoles.filter(Role => Role.USR_RLINK == 'electricview');
    this.delete=this.formrights[0].USR_DEL;
    this.update=this.formrights[0].USR_Update;
  }

  ngOnInit() {
    this.data();
  }

  data(){
    this.sp.show();
    this.ds.getData('/electrview').then((data:any) => {
      this.electric = data.recordset || [];
      this.sp.hide();
		},err => {
			console.log(err);
		})
  }

  deletedata(id,i){
    this.ds.deleteData('/electricdel',id).then((data:any) => {
      // this.greyRecive.splice(i,1);
      //this.electric.splice(i,1);
      this.data();
    },err => {
      console.log(err);
    })
}

}
