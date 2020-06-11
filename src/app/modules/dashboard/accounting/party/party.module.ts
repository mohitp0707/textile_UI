import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { PartyComponent } from './party/party.component';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = 
	[
		{ path : '', component : PartyComponent },

	];

@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	NgbModule,
	NgxPaginationModule,
	RouterModule.forChild(routes)
  ],
  declarations: [PartyComponent,FilterPipe]
})
export class PartyModule { }
