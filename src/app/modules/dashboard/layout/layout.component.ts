import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../../../provider/data-service.service';


@Component({
  selector: 'app-layout',
  host : {'class': "h-100 d-block"},
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  key:any;
	iv:any;
  decryptdata:any;
  data:any;
	userName:string;
  costCenter:string;
  FY:string;

	public isCollapsed = false;
	contentShow:boolean=true;
  constructor(private router:Router,private ds:DataServiceService) {
	this.userName = localStorage.getItem("userName") || null;	
  this.costCenter=localStorage.getItem("costCenter") || null;
  this.ds.getdate();
 }

 logout(){
   console.log("log");
   this.router.navigate(['login']);
 }

  ngOnInit() {
    this.data=sessionStorage.getItem("Data")|| null ;
    this.key = CryptoJS.enc.Utf8.parse('7061737323313233');
    this.iv = CryptoJS.enc.Utf8.parse('7061737323313233'); 
  
      this.key = CryptoJS.enc.Utf8.parse('7061737323313233');
      this.iv = CryptoJS.enc.Utf8.parse('7061737323313233'); 
      var decrypted = CryptoJS.AES.decrypt(this.data, this.key, {
        keySize: 128 / 8,	
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
        });
        this.decryptdata= JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
        this.userName=this.decryptdata.user;
        this.costCenter=this.decryptdata.Branch;
        this.FY=this.decryptdata.FY_FT;
  }
}
