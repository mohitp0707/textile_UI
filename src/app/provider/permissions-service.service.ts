import { Injectable } from '@angular/core';
import {Router , ActivatedRoute, CanActivate } from '@angular/router';

import 'rxjs/add/operator/map';

import { Http, Headers } from '@angular/http';
//import { FormBuilder, Validators } from '@angular/forms';


@Injectable()

export class PermissionsService implements CanActivate {
	constructor(public route : ActivatedRoute, public router : Router){
		
	}
	
/* 	permissions = {
		"provider" : {
			"skills" : false,
			"projectCreation" : true
		},
		"consumer" : {
			"skills" : true,
			"projectCreation" : false
		}
	}
	
	getPermission(role){
	    return this.permissions[role] || {};
	}
	 */
	canActivate(route, router){
		
		var isLoginUrl = router.url.indexOf("/login") != -1;
		var isAppUrl = router.url.indexOf("/dashboard") != -1;
		var isloggedin = this.isLoggedIn();
		//console.log(isloggedin, isAppUrl, isLoginUrl);
		if(isLoginUrl && isloggedin){
			this.router.navigate(["/dashboard"]);
			console.log("User Logged In... Navigate to app");
			return false;
		}else if(isAppUrl && !isloggedin){
			this.router.navigate(["/login"]);
			console.log("User Not Logged In... Navigate to Login");
			return false;
		}else{
			console.log("login skip", isLoginUrl && !isloggedin);
			console.log("app skip", isAppUrl && isloggedin);
			return true;
		}
	}
	
	isLoggedIn(){
		var token = localStorage.getItem("token");
		var tokenCreated : any = new Date(localStorage.getItem("created"));
		var now : any = new Date();
		var validity : any = parseInt(localStorage.getItem("ttl"));
		//console.log(validity, token, now - tokenCreated);
		
		if(token && (now - tokenCreated) < validity){
			return true;
		}else{
			localStorage.clear();
			return false;
		}
	}

}