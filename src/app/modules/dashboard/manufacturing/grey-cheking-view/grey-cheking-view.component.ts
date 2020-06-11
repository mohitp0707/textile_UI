import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-grey-cheking-view',
  templateUrl: './grey-cheking-view.component.html',
  styleUrls: ['./grey-cheking-view.component.scss']
})
export class GreyChekingViewComponent implements OnInit {
	
  	
  p: number = 1;
  greyChecking:any=[];
  update:boolean;
  delete:boolean;
  formrights:any=[];
  searchText:any;

  constructor(public ds : DataServiceService,public sp:Ng4LoadingSpinnerService) { 
    this.formrights  = ds.Roles.filter(Role => Role.USR_RLINK == 'greyChekingview');
    this.delete=this.formrights[0].USR_DEL;
    this.update=this.formrights[0].USR_Update;
   console.log(this.delete)
  }

  ngOnInit() {
    this.data();
  }
  data(){
    this.sp.show();
    this.ds.getData('/GreyCheckView').then((data:any) => {
      this.greyChecking = data.recordset || [];
      this.sp.hide();
		},err => {
			console.log(err);
		})
  }

  buttonState(val){
    if(val.GRCHK_JBC=='done'){
      return true;
    }
  }

  deletedata(id,i){
    this.sp.show();
      this.ds.deleteData('/GRCHKDel',id).then((data:any) => {
        // this.greyChecking.splice(i,1);
        this.data();
      },err => {
        console.log(err);
        this.sp.hide();
      })
  }

}
