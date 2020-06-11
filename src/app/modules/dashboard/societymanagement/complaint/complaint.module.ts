import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComplaintComponent } from './complaint/complaint.component';
import { AddcomplaintComponent } from './addcomplaint/addcomplaint.component';
import { ViewcomplaintComponent } from './viewcomplaint/viewcomplaint.component';
import { ComplaintsingleviewComponent } from './complaintsingleview/complaintsingleview.component';

const routes: Routes = 
	[
		{ path : '', component : ComplaintComponent },
		{ path : 'add-complaint', component : AddcomplaintComponent },
		{ path : 'add-complaint/:id', component : AddcomplaintComponent },
		{ path : 'view-complaint', component : ViewcomplaintComponent }, 
		{ path : 'view-complaint/:id', component : ComplaintsingleviewComponent }
	];

@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	NgbModule,
	RouterModule.forChild(routes)
  ],
  declarations: [ ComplaintComponent, AddcomplaintComponent, ViewcomplaintComponent, ComplaintsingleviewComponent ]
})
export class ComplaintModule { }
