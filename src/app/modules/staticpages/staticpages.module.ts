import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './Login/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const staticRoutes: Routes = 
	[
		{ path : '', component : HomeComponent },
		{  path : 'login', component : HomeComponent }
			
	];

@NgModule({
	imports: [
		CommonModule,FormsModule,NgbModule,
		RouterModule.forChild(staticRoutes)
	],
	declarations: [HomeComponent]
})
export class StaticpagesModule {}