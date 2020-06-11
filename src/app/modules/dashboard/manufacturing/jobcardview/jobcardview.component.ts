import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-jobcardview',
  templateUrl: './jobcardview.component.html',
  styleUrls: ['./jobcardview.component.scss']
})
export class JobcardviewComponent implements OnInit {
  p: number = 1;
  jobcardList:any=[];
  update:boolean;
  delete:boolean;
  formrights:any=[];
  searchText:any;

  constructor(public ds : DataServiceService,public sp:Ng4LoadingSpinnerService) { 
    this.formrights  = ds.Roles.filter(Role => Role.USR_RLINK == 'jobCardview');
    this.delete=this.formrights[0].USR_DEL;
    this.update=this.formrights[0].USR_Update;
  }

  ngOnInit() {
    this.data();
  }

  data(){
    this.sp.show();
    this.ds.getData('/jobCardView').then((data:any) => {
      this.jobcardList = data.recordset || [];
      this.sp.hide();
		},err => {
			console.log(err);
		})
  }

  buttonState(val){
    if(val.JBC_JIntake=='1'){
      return true;
    }
  }
  
  deletedata(id,i){
      this.ds.deleteData('/JobCarDel',id).then((data:any) => {
        // console.log("de");
        // this.jobcardList.splice(i,1);
        //this.jobcardList.splice(i+((this.p-1)*10),1);
        this.data();
      },err => {
        console.log(err);
      })
  }



}
