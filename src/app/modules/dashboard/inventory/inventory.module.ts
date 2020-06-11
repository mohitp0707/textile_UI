import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InventoryComponent } from './inventory/inventory.component';
import { Routes, RouterModule } from '@angular/router';
import { GatePassComponent } from './gate-pass/gate-pass.component';

import { FilterPipe } from './filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { StocksettlementComponent } from './stocksettlement/stocksettlement.component';
import { StocksettlementviewComponent } from './stocksettlementview/stocksettlementview.component';
import { StoreComponent } from './store/store.component';
import { StoreviewComponent } from './storeview/storeview.component';
import { StockinComponent } from './stockin/stockin.component';
import { StockoutComponent } from './stockout/stockout.component';
import { StockinviewComponent } from './stockinview/stockinview.component';
import { StockoutviewComponent } from './stockoutview/stockoutview.component';


export const routes : Routes = 
	[
		{ path : '', component : InventoryComponent },
		{ path : 'product',loadChildren : './product/product.module#ProductModule' },
		{ path : 'productstock',loadChildren : './product-stock/product-stock.module#ProductStockModule' },
		{ path : 'storage',	loadChildren : './storage/storage.module#StorageModule' },
			{ path : 'gatepass', component : GatePassComponent },
			{ path : 'stocksettle', component : StocksettlementComponent },
			{ path : 'stocksettleview', component : StocksettlementviewComponent },
			{ path : 'stocksettle/:id', component : StocksettlementComponent },
			{ path : 'store', component : StoreComponent },
			{ path : 'store/:id', component : StoreComponent },
			{ path : 'storeview', component : StoreviewComponent },
			{ path : 'stockin', component : StockinComponent },
			{ path : 'stockin/:id', component : StockinComponent },
			{ path : 'stockinview', component : StockinviewComponent },
			{ path : 'stockout', component : StockoutComponent },
			{ path : 'stockoutview', component : StockoutviewComponent },
			{ path : 'stockout/:id', component : StockoutComponent }
	]


@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	NgbModule,
	NgxPaginationModule,
	RouterModule.forChild(routes)
  ],
  declarations: [InventoryComponent,GatePassComponent,FilterPipe, StocksettlementComponent,StockinComponent,StockinviewComponent,StockoutComponent, StockoutviewComponent,StocksettlementviewComponent,StoreviewComponent, StoreComponent, StoreviewComponent]
})
export class InventoryModule { }
