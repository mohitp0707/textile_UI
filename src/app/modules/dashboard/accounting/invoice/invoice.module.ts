import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { InvoiceComponent } from './invoice/invoice.component';

import { Routes, RouterModule } from '@angular/router';
import { InvoicereturnComponent } from './invoicereturn/invoicereturn.component';

const routes: Routes = 
	[
		{ path : '', component : InvoiceComponent },

		{ path : 'invoice-return/:type', component : InvoicereturnComponent }
	];

@NgModule({
  imports: [
    CommonModule,
	NgbModule,
	FormsModule,
	RouterModule.forChild(routes)
  ],
  declarations: [InvoiceComponent, InvoicereturnComponent]
})
export class InvoiceModule { }
