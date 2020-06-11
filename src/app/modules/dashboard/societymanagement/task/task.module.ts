import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { AddtaskComponent } from './addtask/addtask.component';
//import { NgbDateNativeAdapter } from './addtask/addtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { TasksingleviewComponent } from './tasksingleview/tasksingleview.component';


const routes: Routes = 
	[
		{ path : '', component : TaskComponent },
		{ path : 'add-task', component : AddtaskComponent },
		{ path : 'add-task/:id', component : AddtaskComponent },
		{ path : 'view-task', component : ViewtaskComponent },
		{ path : 'view-task/:id', component : TasksingleviewComponent }
	];
	
	
@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	NgbModule,
	RouterModule.forChild(routes)
  ],
  declarations: [TaskComponent, AddtaskComponent, ViewtaskComponent, TasksingleviewComponent]
})
export class TaskModule { }
