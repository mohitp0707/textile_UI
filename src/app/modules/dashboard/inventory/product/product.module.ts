import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product/product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FilterPipe } from './filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';

export const routes : Routes = 
	[
		{ path : '', component : ProductComponent },
	]




@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	NgbModule,
	NgxPaginationModule,
	RouterModule.forChild(routes)
  ],
  declarations: [ ProductComponent,FilterPipe]
})
export class ProductModule { }
