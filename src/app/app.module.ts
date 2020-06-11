import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import { DataServiceService } from './provider/data-service.service';
import { PermissionsService } from './provider/permissions-service.service';
import { ngSEO } from './provider/ngSEO.service';

import { ComponentsModule } from './components/components.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchpipePipe } from './provider/searchpipe.pipe';
import {NgxPrintModule} from 'ngx-print';
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import {SelectModule} from 'ng2-select';
import { DatePipe } from '@angular/common';

/**
 * Example of a Native Date adapter
 */
@Injectable()
export class NgbDateNativeAdapter extends NgbDateAdapter<Date> {

  fromModel(date: Date): NgbDateStruct {
    return (date && date.getFullYear) ? {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()} : null;
  }

  toModel(date: NgbDateStruct): Date {
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }
}

const mainRoutes: Routes = 
	[
		{
			path : '',
			loadChildren: './modules/staticpages/staticpages.module#StaticpagesModule',
		},
		{
			path : 'dashboard',
			loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
		},
		{
			path : 'login',
			loadChildren: './modules/login/login.module#LoginModule'
		},
		{
		  path: '**',
		  component: NotFoundComponent
		}
	];


@NgModule({
  declarations: [
		AppComponent,
		SearchpipePipe
  ],
  imports: [
    BrowserModule,
	ComponentsModule,
	Ng2SearchPipeModule,
	AmChartsModule,
	NgxPaginationModule,
	AngularFontAwesomeModule,
	SelectModule,
	AngularMultiSelectModule,
	FormsModule,
	HttpModule,
	NgxPrintModule,
	RouterModule.forRoot(mainRoutes, {
		preloadingStrategy: PreloadAllModules
	}),
	NgbModule.forRoot(),
	Ng4LoadingSpinnerModule.forRoot()
  ],
  exports : [SearchpipePipe],
  providers: [DataServiceService,DatePipe, PermissionsService, ngSEO,SearchpipePipe, {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
  bootstrap: [AppComponent]
})
export class AppModule { }
