import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SocietyComponent } from './society/society.component';

const routes: Routes = 
	[
		{ path : '', component : SocietyComponent},
		{
			path : 'complaint',
			loadChildren : './complaint/complaint.module#ComplaintModule'
		},
		{ 
			path : 'document',
			loadChildren : './document/document.module#DocumentModule'
		},
		{ 
			path : 'house',
			loadChildren : './house/house.module#HouseModule'
		},
		{ 
			path : 'maintenance',
			loadChildren : './maintenance/maintenance.module#MaintenanceModule'
		},
		{ 
			path : 'meeting',
			loadChildren : './meeting/meeting.module#MeetingModule'
		},
		{ 
			path : 'notice',
			loadChildren : './notice/notice.module#NoticeModule'
		},
		{ 
			path : 'task',
			loadChildren : './task/task.module#TaskModule'
		}
	];

@NgModule({
  imports: [
    CommonModule,
	RouterModule.forChild(routes)
  ],
  declarations: [SocietyComponent]
})
export class SocietymanagementModule { }
