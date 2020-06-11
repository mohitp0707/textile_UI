import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HouseComponent } from './house/house.component';
import { AddhouseComponent } from './addhouse/addhouse.component';
import { ViewhouseComponent } from './viewhouse/viewhouse.component';
import { HousesingleviewComponent } from './housesingleview/housesingleview.component';

const routes: Routes = 
	[
		{ path : '', component : HouseComponent },
		{ path : 'add-house', component : AddhouseComponent },
		{ path : 'add-house/:id', component : AddhouseComponent },
		{ path : 'view-house', component : ViewhouseComponent },
		{ path : 'view-house/:id', component : HousesingleviewComponent }
	];

@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	NgbModule,
	RouterModule.forChild(routes)
  ],
  declarations: [ HouseComponent, AddhouseComponent, ViewhouseComponent, HousesingleviewComponent ]
})
export class HouseModule { }
