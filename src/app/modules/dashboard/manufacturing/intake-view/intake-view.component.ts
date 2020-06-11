import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';



@Component({
  selector: 'app-intake-view',
  templateUrl: './intake-view.component.html',
  styleUrls: ['./intake-view.component.scss']
})
export class IntakeViewComponent implements OnInit {


  p: number = 1;
  jobIntake:any=[];
  update:boolean;
  delete:boolean;
  formrights:any=[];
  searchText:any;

  constructor(public ds : DataServiceService,public sp:Ng4LoadingSpinnerService) {
    this.formrights  = ds.Roles.filter(Role => Role.USR_RLINK == 'IntakeView');
    this.delete=this.formrights[0].USR_DEL;
    this.update=this.formrights[0].USR_Update;
   }


  ngOnInit() {
  this.data();
  }
  data(){
    this.sp.show();
    this.ds.getData('/JobIntake').then((data:any) => {
      this.jobIntake = data.recordset || [];
      this.sp.hide();
		},err => {
      console.log(err);
      this.sp.hide();
		})
  }

  
  buttonState(val){
    if(val.JBC_ISDoneProcess!=""){
      return true;
    }
  }

  deletedata(id,i){
    this.sp.show();
    this.ds.deleteData('/JobIntakeDel',id).then((data:any) => {
      // this.jobIntake.splice(i,1);
      //this.jobIntake.splice(i+((this.p-1)*10),1);
      this.data();
      this.sp.hide();
    },err => {
      console.log(err);
      this.sp.hide();
    })
  }

}
