import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../provider/data-service.service' ;
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as CryptoJS from 'crypto-js';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { fakeAsync } from '@angular/core/testing';
 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	
	key:any;
	iv:any;
	encrypted:any;
	user:any={};
	costcenter:any=[];
	financial:any=[];
	input:any={
		user:"",
		password:"",
		FY_FT:"",
		Branch:"",
		CO:""
	}
	FY1:any;
	branch1:any;
	userRights:any=[];
	 // publice LOGO = url("../image/logo.png");
  constructor(public ds : DataServiceService, public route : ActivatedRoute,private router:Router,private spinnerService: Ng4LoadingSpinnerService) {
			sessionStorage.clear();
			localStorage.clear();
	  
	  ds.getData('/Costcenter').then((data:any) => {
				if(!data){
					this.ds.invalidForm = true;
					this.ds.errorMessage = "No data found.";
					return ;
				}
				// Assign single data to form object
				this.costcenter = data.recordset;
					this.getfinancial();
			},err => {
				this.ds.invalidForm = true;
				this.ds.errorMessage = "No data found.";
				console.log(err);
			});

	}

	getfinancial(){
		this.ds.getData('/FY').then((data:any) => {
			if(!data){
				this.ds.invalidForm = true;
				this.ds.errorMessage = "No data found.";
				return ;
			}
			this.financial = data.recordset;
		},err => {
			
			this.ds.invalidForm = true;
			this.ds.errorMessage = "No data found.";
			console.log(err);
		});
	  }



  ngOnInit() {
	this.key = CryptoJS.enc.Utf8.parse('7061737323313233');
	this.iv = CryptoJS.enc.Utf8.parse('7061737323313233'); 
  }

  getRoles(fy){
	return new Promise((resolve, reject) => {
	this.ds.getData('/UserRoles',fy).then((data:any) => {
		resolve(data);
	},err => {
		reject(err);
	});
	});
  }
	
	loginm(input){
	
		if(input.user=="" || typeof(input.user)=='undefined'){
			alert("Please Insert UserName");
		}else if(input.password=="" || typeof(input.password)=='undefined'){
			alert("Please insert Password");
		}else if(input.Branch=="" || typeof(input.Branch)=='undefined'){
			alert("Please Select Branch");
		}else if(input.FY_FT=="" || typeof(input.FY_FT)=='undefined'){
			alert("Please Select Financial Year");
		}else{
		this.spinnerService.show();
		this.ds.login(input).then((data:any) => {
			this.spinnerService.hide();
			if(data.recordset[0].count==1){
			  this.getRoles(input.FY_FT).then((data:any)=>{
				input.Roles=data.recordset;
				 sessionStorage.setItem('FY_F',data.recordsets[1][0].FY_F);
				 sessionStorage.setItem('FY_T',data.recordsets[1][0].FY_T);
				 //sesssion input.FY_ED=data.recordsets[1][0].FY_T;
				delete input.password;
				this.encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(input)), this.key,{
					keySize: 128 / 8,
					iv: this.iv,
					mode: CryptoJS.mode.CBC,
					padding: CryptoJS.pad.Pkcs7
				})

				sessionStorage.setItem('Data', this.encrypted);
				this.router.navigate(['dashboard']);
			
			} );
			}
			else{
				alert("Username & Password are incorrect");
			}
		}, err => {
				this.spinnerService.hide();
				console.log(err);
				console.log("fail");
			})
		}
	}
}
