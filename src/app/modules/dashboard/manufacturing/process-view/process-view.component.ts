import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-process-view',
  templateUrl: './process-view.component.html',
  styleUrls: ['./process-view.component.scss']
})
export class ProcessViewComponent implements OnInit {

  process:any=[];
  p: number = 1;
  update:boolean;
  delete:boolean;
  formrights:any=[];
  searchText:any;
  constructor(public ds : DataServiceService,private router:Router,public sp:Ng4LoadingSpinnerService) {
    this.formrights  = ds.Roles.filter(Role => Role.USR_RLINK == 'ProcView');
    this.delete=this.formrights[0].USR_DEL;
    this.update=this.formrights[0].USR_Update;
   }

  ngOnInit() {
    this.data();
  }
  data(){
    this.sp.show();
    this.ds.getData('/processView').then((data:any) => {
      this.process = data.recordset || [];
      this.sp.hide();
		},err => {
      this.sp.hide();
			console.log(err);
		})
  }
  done(val){
    var r = confirm("Are u sure to done??");
    if (r == true) {
    this.ds.postData('/ProcDone', val).then(data => {
      alert("Process Done Successfully");
    }, err => {
     console.log("Error while Done");
    })
  }
  }
  buttonState(val){
    if(val.JPR_IsPack==1 || val.count1==1){
      return true;
    }
  }
  buttonStateAdd(val){
    if(val.JPR_IsPack==1 || val.count1==1 || val.JPR_ISReprocess==1){
      return true;
    }
  }
  deletedata(id,i){
    this.ds.deleteData('/JobProcDel',id).then((data:any) => {
      //this.process.splice(i+((this.p-1)*10),1);
      this.data();
    },err => {
      console.log(err);
    })
  }
  rLink(proc){
    this.router.navigate(['dashboard/manufacturing/process', proc.ID ]);
  }
}
