import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceComponent } from './maintenance/maintenance.component';

//import { InvoiceModule } from '../../accounting/invoice/invoice.module';


const routes : Routes = 
	[
		{ path : '', component : MaintenanceComponent},
		/* { path : 'addinvoice', component : AddinvoiceComponent },
		{ path : 'viewinvoice/:id', component : InvoicesingleviewComponent },
		{ path : 'viewinvoice', component : ViewinvoiceComponent } */
	];
	
	
@NgModule({
  imports: [
    CommonModule,
	RouterModule.forChild(routes)
  ],
  declarations: [MaintenanceComponent]
})
export class MaintenanceModule { }
