import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';

import { MeetingComponent } from './meeting/meeting.component';
import { AddmeetingComponent } from './addmeeting/addmeeting.component';
import { ViewmeetingComponent } from './viewmeeting/viewmeeting.component';
import { MeetingsingleviewComponent } from './meetingsingleview/meetingsingleview.component';
import { MinuteofmeetingComponent } from './minuteofmeeting/minuteofmeeting.component';


const routes: Routes = 
	[
		{ path : '', component : MeetingComponent },
		{ path : 'add-meeting', component : AddmeetingComponent },
		{ path : 'add-meeting/:id', component : AddmeetingComponent },
		{ path : 'view-meeting', component : ViewmeetingComponent },
		{ path : 'view-meeting/:id', component : MeetingsingleviewComponent },
		{ path : 'minutes-of-meeting', component : MinuteofmeetingComponent }
	];
		
@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	NgbModule,
	RouterModule.forChild(routes)
  ],
  declarations: [ MeetingComponent, AddmeetingComponent, ViewmeetingComponent, MeetingsingleviewComponent, MinuteofmeetingComponent ]
})
export class MeetingModule { }
