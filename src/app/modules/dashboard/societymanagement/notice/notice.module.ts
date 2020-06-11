import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';

import { NoticeComponent } from './notice/notice.component';
import { AddnoticeComponent } from './addnotice/addnotice.component';
import { ViewnoticeComponent } from './viewnotice/viewnotice.component';
import { NoticesingleviewComponent } from './noticesingleview/noticesingleview.component';


const routes: Routes = 
	[
		{ path : '', component : NoticeComponent },
		{ path : 'add-notice', component : AddnoticeComponent },
		{ path : 'add-notice/:id', component : AddnoticeComponent },
		{ path : 'view-notice', component : ViewnoticeComponent },
		{ path : 'view-notice/:id', component : NoticesingleviewComponent }
	];
	
	
@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	NgbModule,
	RouterModule.forChild(routes)
  ],
  declarations: [ NoticeComponent, AddnoticeComponent, ViewnoticeComponent, NoticesingleviewComponent ]
})
export class NoticeModule { }
