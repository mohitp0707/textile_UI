import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoalconsumptionComponent } from './coalconsumption/coalconsumption.component';
import { WatertankComponent } from './watertank/watertank.component';
import { OtherdashComponent } from './otherdash/otherdash.component';
import { FilterPipe } from './filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoalviewComponent } from './coalview/coalview.component';
import { WatertankviewComponent } from './watertankview/watertankview.component';
import { WaterReadingComponent } from './water-reading/water-reading.component';
import { WaterreadingviewComponent } from './waterreadingview/waterreadingview.component';
import { ElectricconsumptionComponent } from './electricconsumption/electricconsumption.component';
import { ElectricconsviewComponent } from './electricconsview/electricconsview.component';
import { WaterreadingreportComponent } from './waterreadingreport/waterreadingreport.component';
import { WatertankreportComponent } from './watertankreport/watertankreport.component';
import { ElectreadreportComponent } from './electreadreport/electreadreport.component';
import { CoalconsumptionreportComponent } from './coalconsumptionreport/coalconsumptionreport.component';
import { SumpipePipe } from './sumpipe.pipe';

export const routes : Routes = 
	[
		{ path : '', component : OtherdashComponent },
    { path : 'coalcons', component : CoalconsumptionComponent },
    { path : 'coalcons/:id', component : CoalconsumptionComponent },
    { path : 'coalview', component : CoalviewComponent },
    { path : 'watertank', component : WatertankComponent },
    { path : 'watertankview', component : WatertankviewComponent },
    { path : 'watertank/:id', component : WatertankComponent },
    { path : 'waterreading', component : WaterReadingComponent },
    { path : 'waterreading/:id', component : WaterReadingComponent },
    { path : 'waterredview', component : WaterreadingviewComponent },
    { path : 'electric', component : ElectricconsumptionComponent },
    { path : 'electric/:id', component : ElectricconsumptionComponent },
    { path : 'electricview', component : ElectricconsviewComponent },
    { path : 'waterredreport', component : WaterreadingreportComponent },
    { path : 'watertankreport', component : WatertankreportComponent },
    { path : 'electreadreport', component : ElectreadreportComponent },
    { path : 'coalconsReport', component : CoalconsumptionreportComponent }
	]


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CoalconsumptionComponent, WatertankComponent, OtherdashComponent,FilterPipe, CoalviewComponent,SumpipePipe, WatertankviewComponent, WaterReadingComponent, WaterreadingviewComponent, ElectricconsumptionComponent, ElectricconsviewComponent, WaterreadingreportComponent, WatertankreportComponent, ElectreadreportComponent, CoalconsumptionreportComponent]
})
export class OtherModule { }
