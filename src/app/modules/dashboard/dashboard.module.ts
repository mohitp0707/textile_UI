import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from '../../components/not-found/not-found.component';
import { SettingsComponent } from './settings/settings.component';


export const routes: Routes = 
	[
		{
			path : '',	component : LayoutComponent,
			children :
			[
				{ path : '', component : DashboardComponent },
				{
					path : 'accounting',
					loadChildren: './accounting/accounting.module#AccountingModule'
				},
				{
					path : 'masters',
					loadChildren: './masters/masters.module#MastersModule'
				},
				{
					path : 'stock',
					loadChildren: './inventory/inventory.module#InventoryModule'
				},
				{
					path : 'report',
					loadChildren: './report/report.module#ReportModule'
				},
				{
					path : 'manageuser',
					loadChildren: './manageuser/manageuser.module#ManageuserModule'
				},
				{
					path : 'manufacturing',
					loadChildren: './manufacturing/manufacturing.module#ManufacturingModule'
				},
				{
					path : 'OtherModule',
					loadChildren: './other/other.module#OtherModule'
				},
				{
					path : 'printing',
					loadChildren: './printing/printing.module#PrintingModule'
				},
				{
				  path: '**',
				  component: NotFoundComponent
				}
			]
		}
	]; 

@NgModule({
  imports: [
    CommonModule,
	ComponentsModule,
	NgbModule,
	FormsModule,
	RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent, LayoutComponent, SettingsComponent]
})
export class DashboardModule { }