import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaxmasterComponent } from './taxmaster/taxmaster.component';
import { FilterPipe } from './filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { MachineMasterComponent } from './machine-master/machine-master.component';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { AddstorageComponent } from './addstorage/addstorage.component';
import { ViewstorageComponent } from './viewstorage/viewstorage.component';
import { AddpartyComponent } from './addparty/addparty.component';
import { ViewpartyComponent } from './viewparty/viewparty.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeviewComponent } from './employeeview/employeeview.component';
import { MasterdahsboardComponent } from './masterdahsboard/masterdahsboard.component';
import { BrokerComponent } from './broker/broker.component';
import { BrokerviewComponent } from './brokerview/brokerview.component';
import { TransportComponent } from './transport/transport.component';
import { TransportviewComponent } from './transportview/transportview.component';
import { ProcessComponent } from './process/process.component';
import { ProcessviewComponent } from './processview/processview.component';
import { OtherchargeComponent } from './othercharge/othercharge.component';

export const routes : Routes = 
	[
      { path : '', component : MasterdahsboardComponent },
			{ path : 'taxxmaster', component : TaxmasterComponent },
      { path : 'MachineMaster', component : MachineMasterComponent },
      { path : 'AddProduct', component : AddProductComponent },
      { path : 'AddProduct/:id', component : AddProductComponent },
      { path : 'viewproduct', component : ViewproductComponent },
      { path : 'AddCategory', component : AddcategoryComponent },
      { path : 'addstorage', component : AddstorageComponent },
      { path : 'viewstorage', component : ViewstorageComponent },
      { path : 'addstorage/:id', component : AddstorageComponent },
      { path : 'addparty/:type', component : AddpartyComponent },
      { path : 'editParty/:PM_ID', component : AddpartyComponent },
      { path : 'viewparty/:type', component : ViewpartyComponent },
      { path : 'employee', component : EmployeeComponent },
      { path : 'employeeview', component : EmployeeviewComponent },
      { path : 'employee/:id', component : EmployeeComponent },
      { path : 'broker', component : BrokerComponent },
      { path : 'broker/:id', component : BrokerComponent },
      { path : 'brokerview', component : BrokerviewComponent },
      { path : 'trasport', component : TransportComponent },
      { path : 'trasport/:id', component : TransportComponent },
      { path : 'trasnportview', component : TransportviewComponent },
       { path : 'process', component : ProcessComponent },
       { path : 'othrcharge', component : OtherchargeComponent }
	]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TaxmasterComponent,MachineMasterComponent,FilterPipe, AddpartyComponent, ViewpartyComponent,EmployeeComponent, EmployeeviewComponent ,AddstorageComponent, ViewstorageComponent,AddProductComponent,ViewproductComponent,AddcategoryComponent, MasterdahsboardComponent, BrokerComponent, BrokerviewComponent, TransportComponent, TransportviewComponent, ProcessComponent, ProcessviewComponent, OtherchargeComponent]
})
export class MastersModule { }
