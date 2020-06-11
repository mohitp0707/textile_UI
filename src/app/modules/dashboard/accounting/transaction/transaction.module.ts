import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';

import { TransactionComponent } from './transaction/transaction.component';
import { AddtransactionComponent } from './addtransaction/addtransaction.component';
import { ViewreceiptComponent } from './viewreceipt/viewreceipt.component';
import { ViewtransactionComponent } from './viewtransaction/viewtransaction.component';
import { TransferComponent } from './transfer/transfer.component';
import { AddincomeComponent } from './addincome/addincome.component';

const routes: Routes = 
	[
		{ path : '', component : TransactionComponent },
		/* { path : 'view-receipt', component : ViewreceiptComponent }, */
		{ path : 'add-transaction/:type', component : AddtransactionComponent },
		{ path : 'view-transaction/:id', component : ViewtransactionComponent },
		{ path : 'view-transaction', component : ViewtransactionComponent },
		{ path : 'transfer', component : TransferComponent },
	];

@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	NgbModule,
	RouterModule.forChild(routes)
  ],
  declarations: [TransactionComponent, AddtransactionComponent, ViewtransactionComponent, ViewreceiptComponent, TransferComponent, AddincomeComponent]
})
export class TransactionModule { }
