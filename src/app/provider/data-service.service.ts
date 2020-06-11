import { Injectable } from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

//import { FormBuilder, Validators } from '@angular/forms';
/* import * as jQuery from 'jquery/dist/jquery.js';

import 'messenger/build/js/messenger.js'; */

 //declare let jQuery: any;
 /* declare let Messenger: any;

Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
    theme: 'flat'
} */

@Injectable()
export class DataServiceService {
	isLogged : boolean;
	isLoggedin: boolean;
    AuthToken;
	userDetails: any; 
	costCenter : any;
	FY:any;
	costCenterId:any;
	FYID:any;
	// serverBase = 'http://localhost:3000';
	//serverBase = 'http://eledash.herokuapp.com';
	serverBase = environment.path; 
	// APISERVERCONF.PROTOCOL + APISERVERCONF.HOST + ":"+APISERVERCONF.PORT;
	serverPath = this.serverBase + "/api";
	serverBaceImage = this.serverBase + "/uploads/service/";
	
	validators:any;
	manufRoles:any=[];
	Roles:any=[];
	FYdet:any={
		FY_F:"",
		FY_T:""
	};
	pageItems;
	skipItems;
	dataApi;
	dataSession:any;
	key:any;
	iv:any;
	decryptdata:any;
	
    constructor(public http: Http, public router: Router,private config: NgbDatepickerConfig ) {
		
	

        this.isLoggedin = false;
        this.AuthToken = null;
		this.isLogged =false;
		 this.dataSession=sessionStorage.getItem("Data")|| null ;
		 this.key = CryptoJS.enc.Utf8.parse('7061737323313233');
		 this.iv = CryptoJS.enc.Utf8.parse('7061737323313233'); 
		
		 if(!this.dataSession) {
			 this.logout();
		 }else{
			this.sessionparse();
		 }
		
		//  console.log(this.FYdet.FY_T);
		//  var decrypted = CryptoJS.AES.decrypt(this.dataSession, this.key, {
		// 	keySize: 128 / 8,	
		// 	iv: this.iv,
		// 	mode: CryptoJS.mode.CBC,
		// 	padding: CryptoJS.pad.Pkcs7
		// 	});
		// 	this.decryptdata= JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
		// 	console.log(this.decryptdata);
	}

	getdate(){
		let FY_SD, FY_ED;
			 FY_SD=sessionStorage.getItem('FY_F');
			FY_ED=sessionStorage.getItem('FY_T');
			const fromdate = new Date(FY_SD);
			const todate = new Date(FY_ED);
			this.config.minDate = {year:fromdate.getFullYear(), month:fromdate.getMonth()+1, day: fromdate.getDate()};
			this.config.maxDate = {year:todate.getFullYear(), month:todate.getMonth()+1, day: todate.getDate()};
			
	}
	
	sessionparse(){
		var decrypted = CryptoJS.AES.decrypt(this.dataSession, this.key, {
			keySize: 128 / 8,	
			iv: this.iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
			});
			this.decryptdata= JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
			this.userDetails=this.decryptdata.user;
			this.FYdet=this.decryptdata.FYdet;
			this.costCenter =this.decryptdata.Branch;
			this.FY=this.decryptdata.FY_FT;
			this.costCenterId=this.decryptdata.CO_ID;
			this.FYID=this.decryptdata.FY_ID;
			this.Roles=this.decryptdata.Roles;
	
			
	}

	invalidForm = false;
	formSubmitted = false;
	submittedMessage = 'Form Submitted Successfully.';
	errorMessage = 'Please fill out all fields.';
	
	showFormAlert(){
		this.invalidForm = true;
		setTimeout(() => {
			this.invalidForm = false;
		}, 5000)
	}
	
    storeUserCredentials(token) {
        window.localStorage.setItem('token', token);
        this.useCredentials(token);
	}
    
    useCredentials(token) {
        this.isLoggedin = true;
        this.AuthToken = token;
		// this.userDetails = window.localStorage.getItem("userDetails") ? JSON.parse(window.localStorage.getItem("userDetails")) : null;
	}
    
    loadUserCredentials() {
        var token = window.localStorage.getItem('token');
        this.useCredentials(token);
	}
	
    destroyUserCredentials() {
        this.isLoggedin = false;
        this.AuthToken = null;
        window.localStorage.clear();
	}
    query ={
		
		
	}
    login(user) {
		
        return new Promise((resolve, reject) => {
			var params = { filter:{include : "role" }};
			var headers = new Headers();
            this.loadUserCredentials();
            
			if(!user.user || !user.password){
				return resolve("Email and Password Required.");
			}
			
			this.http.post(this.serverPath + '/userAuth', user).map(res => res.json()).subscribe(data => {
				
				localStorage.setItem("userName", user.user);
				localStorage.setItem("costCenter", user.Branch);
				this.userDetails = localStorage.getItem("userName") || null;
				this.costCenter=localStorage.getItem("costCenter") || null;
				headers.append('Authorization', user.user);
				resolve(data);

				
			}, err => {
				
				reject(err);
			});
		});
	}
	
    signup(user) {
		
		if(!user.username)
		user.username = user.email;
        return new Promise((resolve, reject) => {
            this.http.post(this.serverPath + '/users', user)
			.map((data:any) => data.json())
			.subscribe(data => {
				resolve(data);
                console.log(data);
			}, err => {
				var error = err.json().error.details;
				//this.showErr(err);
				reject(err.json().error);
			});
		});
	}
	
    logout(message : any = ""){
		// return new Promise(resolve => {
			
		// 	var headers = new Headers();
        //     this.loadUserCredentials();
			
		// 	var tokenCreated : any = new Date(localStorage.getItem("created"));
		// 	var now : any = new Date();
		// 	var validity : any = parseInt(localStorage.getItem("ttl"));
			
		// 	// Return from here if user is not logged in or token expired.
		// 	if(!this.AuthToken || (now - tokenCreated) > validity){
		// 		this.destroyUserCredentials();
		// 		return resolve("Logout...");
		// 	}
			
		// 	// If valid token request to server for logout
        //     headers.append('Authorization', localStorage.getItem("token"));
			
		// 	console.log("logout called...");
		// 	this.http.post(this.serverPath + '/users/logout', {}, { headers : headers }).map(res =>res.json()).subscribe(data => {
		// 		this.destroyUserCredentials();
		// 		this.router.navigate(['/login']);
		// 		resolve(true);
		// 	}, err => {
		// 		this.destroyUserCredentials();
		// 		this.router.navigate(['/login']);
		// 		resolve(false);
		// 		//this.showErr(err);
		// 	});
		// })
		this.router.navigate(['/login']);
	}
	
    getUserDetails() {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            this.loadUserCredentials();
            //console.log(this.AuthToken);
            headers.append('Authorization', this.AuthToken);
			
			if(localStorage.getItem("userDetails")){
				this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
				return resolve(this.userDetails);
			}
			
			if(!this.AuthToken){
				this.destroyUserCredentials();
				return resolve();
			}
			
            this.http.get(this.serverPath + '/users/'+localStorage.getItem("userId"), {headers: headers})
			.map((data:any) => data.json())
			.subscribe(data => {
				if(data){
					localStorage.setItem("userDetails", JSON.stringify(data));
					this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
					resolve(data.username + " has logged in successfully.");
				}else{
					//this.showErr("Error: User details not matched. Please try again.");
					reject("Error: User details not matched. Please try again.");
				}
			}, err => {
				//this.showErr(err);
				reject(err);
			});
		})
	}
    resetLimits(){
		this.pageItems = 10;
		this.skipItems = 0;
		this.dataApi = null;
	}
	
	getData(api, filter: any = null, pagination: any = null, scrollEvent = null){
		return new Promise((resolve,reject) => {
			var params = filter ? { filter : filter } : null;
			if(!params){
			}
			if(this.dataApi != api || pagination == 1){
				this.resetLimits();
			}
			if(pagination){
				this.dataApi = api;
				params.filter.limit = this.pageItems;
				params.filter.skip = this.skipItems;
				this.skipItems = this.pageItems * pagination;
			}
			var headers = new Headers();
			this.loadUserCredentials();
			headers.append('Authorization', this.AuthToken);
			
			this.http.get(this.serverPath + api, { headers : headers, params })
			.map((data:any) => data.json())
			.subscribe(data => {
				
				if(data){
					resolve(data);
					if(scrollEvent && (data.length == 0 || data.length < this.pageItems)){
						scrollEvent.enable(false);
					}
					}else if(scrollEvent){
					resolve(data);
					scrollEvent.enable(false);
				}
				
			}, err => {
				reject(err);
				//this.showErr(err);
			});
		});
	}
	
	
	getConfig(name?){
		return new Promise((resolve,reject) => {
			this.http.get("/assets/json/config.json")
			.map((data:any) => data.json())
			.subscribe(data => {
				let config = name ? data[name] : data;
				resolve(config);
			}, err => {
				reject(err);
			});
		});
	}
	
	
	/* 
	showErr(err){
		let errMsg = "Unexpected Error!";
		err = err || {};
		let error = err.json ? err.json() : err; 
		if(err.status == 401){
			errMsg = "Authorization Required or You don't have permission.";
		}else if(err.status == 500){
			errMsg = "Internal Server Error";
		}else if(err.status == 404){
			errMsg = error.error.message;
		}else{
			errMsg = err;
		}
		Messenger().post({
			message: errMsg,
			type: 'error',
			showCloseButton: true,
		});
		console.log(error);
		console.log(errMsg);
	}
	
	showSuccess(message){
		Messenger().post({
			message: message,
			type: 'success',
			showCloseButton: true,
		});
	} */
	
	postData(api, input){
		return new Promise((resolve, reject) => {
			var headers = new Headers();
			this.loadUserCredentials();
			headers.append('Authorization', this.AuthToken);
			
			this.http.post(this.serverPath + api, input, { headers : headers })
			.map((response:any) => response.json())
			.subscribe(response => {
				if(response){
					response.id = response.id || null;
					// localStorage.setItem("userId", response.userId);
				}
				//this.showSuccess("Details Saved Successfully.");
				resolve(response);
				//console.log("Record Created Successfully.");
			}, err => {
				//this.showErr(err);
				reject(err);
			});
		});
	}
	putData(api ,input){
		return new Promise((resolve, reject) => {
			var headers = new Headers();
			this.loadUserCredentials();
			headers.append('Authorization', this.AuthToken);
			
			this.http.post(this.serverPath + api  , input, { headers : headers })
			.map((data:any) => data.json())
			.subscribe(data => {
				resolve(data);
				//this.showSuccess("Details Updated Successfully.");
			}, err => {
				//this.showErr(err);
				reject(err);
			});
		});
	}
	updateData(api, id, input){
		return new Promise((resolve, reject) => {
			var headers = new Headers();
			this.loadUserCredentials();
			headers.append('Authorization', this.AuthToken);
			
			this.http.put(this.serverPath + api + "/" + id, input, { headers : headers })
			.map((data:any) => data.json())
			.subscribe(data => {
				resolve(data);
				//this.showSuccess("Details Updated Successfully.");
			}, err => {
				//this.showErr(err);
				reject(err);
			});
		});
	}
	deleteData(api, id){
		return new Promise((resolve, reject) => {
			var headers = new Headers();
			this.loadUserCredentials();
			headers.append('Authorization', this.AuthToken);
			
			if(id!=""){
			var conf = confirm("Are you sure?");
			
			if(!conf){
				return resolve();
			}
			
			this.http.delete(this.serverPath + api + "/" + id, { headers : headers })
			.map((data:any) => data.json())
			.subscribe(data => {
				resolve(data);
				alert("Record Deleted Successfully.");
			}, err => {
				//this.showErr(err);
				reject(err);
			});
			}
			else
			{
			this.http.delete(this.serverPath + api, { headers : headers })
			.map((data:any) => data.json())
			.subscribe(data => {
				resolve(data);
				//this.showSuccess("Record Deleted Successfully.");
			}, err => {
				//this.showErr(err);
				reject(err);
			});	
				
			}
		});
	}
	deleteExperience(api){
		return new Promise((resolve, reject) => {
			var headers = new Headers();
			this.loadUserCredentials();
			headers.append('Authorization', this.AuthToken);
			
			this.http.delete(this.serverPath + api , { headers : headers })
			.map((data:any) => data.json())
			.subscribe(data => {
				resolve(data);
			}, err => {
				//this.showErr(err);
				reject(err);
			});
		});
		
	}
	resetLink(email){
		return new Promise((resolve, reject) => {
			this.http.post(this.serverPath + '/users/reset', email).map(res => res.json()).subscribe(data => {
				console.log(data);
				resolve(data);
				this.getUserDetails();
			}, err => {
				//this.showErr(err);
				reject("Email  not valid");
			});
		});
	}
	resetPass(newPassword, Token){
		return new Promise((resolve, reject) => {
			var headers = new Headers();
			headers.append('Authorization', Token);
			
			this.http.post(this.serverPath +'/users/reset-password', { newPassword : newPassword}, { headers : headers })
			.map((data:any) => data.json())
			.subscribe(data => {
				resolve(data);
			}, err => {
				//this.showErr(err);
				reject(err);
			});
		});
	}
	uploadFile(api , file){
		return new Promise((resolve,reject) => {
			/* if(!file){ 
				reject("File Data not found");
			} */
			var headers= new Headers();
			this.loadUserCredentials();
			headers.append('Authorization',this.AuthToken);
			
			this.http.post(this.serverPath + api,file).map((response:any) => response.json())
			.subscribe(response => {
				console.log(response);
				console.log("Success");
				resolve (response);
			}, err => {
				//this.showErr(err);
				reject(err);
			});
			
		})
		
	}
	
}
