import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductstockComponent } from './productstock/productstock.component';
import { StockinComponent } from './stockin/stockin.component';
import { StockoutComponent } from './stockout/stockout.component';
import { StockinviewComponent } from './stockinview/stockinview.component';
import { StockoutviewComponent } from './stockoutview/stockoutview.component';
import { StockreportComponent } from './stockreport/stockreport.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';

export const routes : Routes = 
	[
		{ path : '', component : ProductstockComponent },
		{ path : 'stockin', component : StockinComponent },
		{ path : 'stockin/:id', component : StockinComponent },
		{ path : 'stockinview', component : StockinviewComponent },
		{ path : 'stockout', component : StockoutComponent },
		{ path : 'stockoutview', component : StockoutviewComponent },
		{ path : 'stockout/:id', component : StockoutComponent },
		{ path : 'stockoutReport', component : StockreportComponent }
	]

@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	NgbModule,
	NgxPaginationModule,
	RouterModule.forChild(routes)
  ],
  declarations: [ProductstockComponent,FilterPipe, StockinComponent, StockoutComponent, StockinviewComponent, StockoutviewComponent, StockreportComponent]
})
export class ProductStockModule { }
