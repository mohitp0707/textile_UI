import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { VerifyComponent } from './verify/verify.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';

const loginRoutes : Routes = 
	[{
		path : '',
		component : LoginLayoutComponent,
		children : [{
			path : '',
			component : LoginComponent
		},{
			path : 'signup',
			component : SignupComponent
		}, {
			path : 'forgotpassword', component : ForgotpasswordComponent
		}, {
			path : 'resetpassword', component : ResetpasswordComponent
		}, {
			path : 'verify', component : VerifyComponent
		}]
	}];

@NgModule({
  imports: [
    CommonModule,
	RouterModule.forChild(loginRoutes)
  ],
  declarations: [LoginComponent, SignupComponent, ForgotpasswordComponent, ResetpasswordComponent, VerifyComponent, LoginLayoutComponent]
})
export class LoginModule { }
