import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FilterPipe } from './filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

import { ReportComponent } from './report/report.component';
import { StockReportComponent } from './stock-report/stock-report.component';
import { JobCardStockReportComponent } from './job-card-stock-report/job-card-stock-report.component';
import { MachinewiseprocessComponent } from './machinewiseprocess/machinewiseprocess.component';
import { DispatchReportComponent } from './dispatch-report/dispatch-report.component';
import { FinishgoodReportComponent } from './finishgood-report/finishgood-report.component';
import { RawStockComponent } from './raw-stock/raw-stock.component';
import { GreyReceiveReportComponent } from './grey-receive-report/grey-receive-report.component';
import { GreyCheckingReportComponent } from './grey-checking-report/grey-checking-report.component';
import { SumpipePipe } from './sumpipe.pipe';
import { PackingreportComponent } from './packingreport/packingreport.component';
import { StocRegisterMonthComponent } from './stoc-register-month/stoc-register-month.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrackreportComponent } from './trackreport/trackreport.component';
import { DyingProcReportComponent } from './dying-proc-report/dying-proc-report.component';
import { FinishProcReportComponent } from './finish-proc-report/finish-proc-report.component';
import { CostReportComponent } from './cost-report/cost-report.component';
import { JobintakereportComponent } from './jobintakereport/jobintakereport.component';
import { StorereportComponent } from './storereport/storereport.component';
import { PurchasereportComponent } from './purchasereport/purchasereport.component';
import { StockinreportComponent } from './stockinreport/stockinreport.component';
import { StockoutreportComponent } from './stockoutreport/stockoutreport.component';
import { AccountledgerComponent } from './accountledger/accountledger.component';

const routes: Routes = 
	[
    { path : '', component : ReportComponent },
    { path : 'stock', component : StockReportComponent },
    { path : 'JobCardStock', component : JobCardStockReportComponent },
    { path : 'machineProcess', component : MachinewiseprocessComponent },
    { path : 'dispatchReport', component : DispatchReportComponent },
    { path : 'FinishGoodReport', component : FinishgoodReportComponent },
    { path : 'rawstock', component : RawStockComponent },
    { path : 'greyRec', component : GreyReceiveReportComponent },
    { path : 'greyChck', component : GreyCheckingReportComponent },
    { path : 'packreport', component : PackingreportComponent },
    { path : 'stockregistermonth', component : StocRegisterMonthComponent },
    { path : 'trackreport', component : TrackreportComponent },
    { path : 'DyingProcReport', component : DyingProcReportComponent },
    { path : 'FinishProcReport', component : FinishProcReportComponent },
    { path : 'costReport', component : CostReportComponent },
    { path : 'jobintak', component : JobintakereportComponent },
    { path : 'storereport', component : StorereportComponent },
    { path : 'purchasereport', component : PurchasereportComponent },
    { path : 'stockinreport', component : StockinreportComponent },
    { path : 'stockoutreport', component : StockoutreportComponent },
    { path : 'accountledger', component : AccountledgerComponent }

	];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
	RouterModule.forChild(routes)
  ],
  declarations: [FilterPipe, ReportComponent, StockReportComponent, JobCardStockReportComponent, MachinewiseprocessComponent, DispatchReportComponent, FinishgoodReportComponent, RawStockComponent, GreyReceiveReportComponent, GreyCheckingReportComponent, SumpipePipe, PackingreportComponent, StocRegisterMonthComponent, TrackreportComponent, DyingProcReportComponent, FinishProcReportComponent, CostReportComponent, JobintakereportComponent, StorereportComponent, PurchasereportComponent, StockinreportComponent, StockoutreportComponent, AccountledgerComponent ]
})
export class ReportModule { }
