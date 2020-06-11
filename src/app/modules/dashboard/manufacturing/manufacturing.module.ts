import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManufacturingComponent } from './manufacturing/manufacturing.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GreyReceiveComponent } from './grey-receive/grey-receive.component';
import { GreyRecieveviewComponent } from './grey-recieveview/grey-recieveview.component';
import { GreyChekingComponent } from './grey-cheking/grey-cheking.component';
import { GreyChekingViewComponent } from './grey-cheking-view/grey-cheking-view.component';
import { JobWorkComponent } from './job-work/job-work.component';
import { ProcessComponent } from './process/process.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { JobcardviewComponent } from './jobcardview/jobcardview.component';
import { ProcessMasterComponent } from './process-master/process-master.component';
import { ProcessViewComponent } from './process-view/process-view.component';
import { IntakeJcardComponent } from './intake-jcard/intake-jcard.component';
import { FilterPipe } from './filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { IntakeViewComponent } from './intake-view/intake-view.component';
import { PackingComponent } from './packing/packing.component';
import { PackingviewComponent } from './packingview/packingview.component';
import { DispatchComponent } from './dispatch/dispatch.component';
import { PrintProcessComponent } from './print-process/print-process.component';
import { DispatchviewComponent } from './dispatchview/dispatchview.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceviewComponent } from './invoiceview/invoiceview.component';
import { SumpipePipe } from './sumpipe.pipe';


 
export const routes : Routes = 
	[
		{ path : '', component : ManufacturingComponent },
		{ path : 'greyrecieve', component : GreyReceiveComponent },
		{ path : 'greyrecieveview', component : GreyRecieveviewComponent },
		{ path : 'greyrecieveview/:id', component : GreyReceiveComponent },
		{ path : 'greyCheking', 	component : GreyChekingComponent },
		{ path : 'greyChekingview', component : GreyChekingViewComponent },
		{ path : 'greyCheking/:id', component : GreyChekingComponent },
		{ path : 'jobCard', component : JobWorkComponent },
		{ path : 'jobCard/:id', component : JobWorkComponent },
		{ path : 'jobCardview', component : JobcardviewComponent },
		{ path : 'process', component : ProcessComponent },
		{ path : 'process/:id', component : ProcessComponent },
		{ path : 'ProcessMaser', component : ProcessMasterComponent },
		{ path : 'ProcView', component : ProcessViewComponent },
		{ path : 'process/:Rprocss', component : ProcessComponent },
		{ path : 'Intake', component : IntakeJcardComponent },
		{ path : 'IntakeView', component : IntakeViewComponent },
		{ path : 'Intake/:id', component : IntakeJcardComponent },
		{ path : 'packing', component : PackingComponent },
		{ path : 'packingview', component : PackingviewComponent },
		{ path : 'packing/:id', component : PackingComponent },
		{ path : 'dispatch', component : DispatchComponent },
		{ path : 'dispatch/:id', component : DispatchComponent },
		{ path : 'dispatchview', component : DispatchviewComponent },
		{ path : 'printProcess/:id', component : PrintProcessComponent },
		{ path : 'invoice', component : InvoiceComponent },
		{ path : 'invoice/:id', component : InvoiceComponent },
		{ path : 'invoiceview', component : InvoiceviewComponent }

	]

@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	NgbModule,
	AngularMultiSelectModule,
	NgxPaginationModule,
	RouterModule.forChild(routes)
  ],

  declarations: [ManufacturingComponent, GreyReceiveComponent,SumpipePipe, GreyRecieveviewComponent, GreyChekingComponent, GreyChekingViewComponent, JobWorkComponent, ProcessComponent, JobcardviewComponent, ProcessMasterComponent, ProcessViewComponent, IntakeJcardComponent, FilterPipe, IntakeViewComponent, PackingComponent, PackingviewComponent, DispatchComponent, PrintProcessComponent, DispatchviewComponent, InvoiceComponent, InvoiceviewComponent]
})
export class ManufacturingModule { }
