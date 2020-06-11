import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StorageComponent } from './storage/storage.component';


export const routes : Routes = 
	[
		{ path : '', component : StorageComponent }

		
	]


@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	NgbModule,
	RouterModule.forChild(routes)
  ],
  declarations: [ StorageComponent]
})
export class StorageModule { }
