import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-grey-recieveview',
  templateUrl: './grey-recieveview.component.html',
  styleUrls: ['./grey-recieveview.component.scss']
})
export class GreyRecieveviewComponent implements OnInit {
	
  p: number = 1;
  greyRecive:any=[];
  update:boolean;
  delete:boolean;
  formrights:any=[];
  searchText:any;
  constructor(public ds : DataServiceService, private sp:Ng4LoadingSpinnerService) {
   
    this.formrights  = ds.Roles.filter(Role => Role.USR_RLINK == 'greyrecieveview');
    this.delete=this.formrights[0].USR_DEL;
    this.update=this.formrights[0].USR_Update
    //this.delete=this.formrights[0].USR_DEL;
  //  this.update=true;
  // this.delete=true;

  }

  ngOnInit() {
    this.data();
  }

  data(){
    this.sp.show();
	  this.ds.getData('/GreyRecieveView').then((data:any) => {
      this.greyRecive = data.recordset || [];
      this.sp.hide();
		},err => {
      this.sp.hide();
			console.log(err);
		})
  }

  buttonState(val){
    if(val.GR_Check=='done'){
      return true;
    }
  }

  deletedata(id,i){
    this.sp.show();
    // this.greyRecive.splice(i,1);
    // console.log(i,1);
      this.ds.deleteData('/greyReDel',id).then((data:any) => {
        // this.greyRecive.splice(i,1);
        //this.greyRecive.splice(i+((this.p-1)*10),1);
        this.data();
      },err => {
        this.sp.hide();
        console.log(err);
      })
  }
}
