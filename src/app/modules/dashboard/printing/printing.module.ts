import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrvprintComponent } from './grvprint/grvprint.component';
import { Routes, RouterModule } from '@angular/router';
import { GrcprintComponent } from './grcprint/grcprint.component';
import { JobcardprintComponent } from './jobcardprint/jobcardprint.component';
import { PackingprintComponent } from './packingprint/packingprint.component';
import { DispatchprintComponent } from './dispatchprint/dispatchprint.component';
import { InvoiceprintComponent } from './invoiceprint/invoiceprint.component';


export const routes : Routes = 
	[
    { path : 'grvprint/:id', component :  GrvprintComponent },
    { path : 'grcprint/:id', component :  GrcprintComponent },
    { path : 'jobcardprint/:id', component :  JobcardprintComponent },    
    { path : 'packing/:id', component :  PackingprintComponent },
    { path : 'dispatch/:id', component :  DispatchprintComponent },
    { path : 'invoice/:id', component :  InvoiceprintComponent }

	]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GrvprintComponent, GrcprintComponent, JobcardprintComponent, PackingprintComponent, DispatchprintComponent, InvoiceprintComponent]
})
export class PrintingModule { }
