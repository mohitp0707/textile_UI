import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AccountingComponent } from './accounting/accounting.component';
import { AddinvoiceComponent } from './addinvoice/addinvoice.component';
import { ViewinvoiceComponent } from './viewinvoice/viewinvoice.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { TransactionVoucherComponent } from './transaction-voucher/transaction-voucher.component';
import { TransactionVoucherViewComponent } from './transaction-voucher-view/transaction-voucher-view.component';

export const routes : Routes = 
	[
		{ path : '', component : AccountingComponent },
		{
			path : 'account',
			loadChildren : './account/account.module#AccountModule'
		},
		{ 
			path : 'invoice',
			loadChildren : './invoice/invoice.module#InvoiceModule'
		},
		{ 
			path : 'party',
			loadChildren : './party/party.module#PartyModule'
		},
		{ 
			path : 'transaction',
			loadChildren : './transaction/transaction.module#TransactionModule'
		},
		{ path : 'invoice/add-invoice/:type', component : AddinvoiceComponent },
		{ path : 'invoice/view-invoice/add-invoice/:type/:id', component : AddinvoiceComponent },
		{ path : 'invoice/view-invoice/:type', component : ViewinvoiceComponent },
		{ path : 'invoice/voucher/:type', component : TransactionVoucherComponent },
		{ path : 'invoice/voucher-view/voucher/:type/:id', component : TransactionVoucherComponent },
		{ path : 'invoice/voucher-view/:type', component : TransactionVoucherViewComponent }


	]

@NgModule({
  imports: [
		CommonModule,
		FormsModule,
		NgbModule,
		NgxPaginationModule,
	RouterModule.forChild(routes)
  ],
  declarations: [ AccountingComponent,AddinvoiceComponent,ViewinvoiceComponent,FilterPipe, TransactionVoucherComponent, TransactionVoucherViewComponent ]
})
export class AccountingModule { }
