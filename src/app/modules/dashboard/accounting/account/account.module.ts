import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AccountComponent } from './account/account.component';

import { AddaccountComponent } from './addaccount/addaccount.component';
import { ViewaccountComponent } from './viewaccount/viewaccount.component';

const routes : Routes = 
	[
		{ path : '', component : AccountComponent },
		{ path : 'add-account', component : AddaccountComponent },
		{ path : 'add-account/:id', component : AddaccountComponent },
		{ path : 'view-account', component : ViewaccountComponent },

	];

@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	NgbModule,
	RouterModule.forChild(routes)
  ],
  declarations: [AccountComponent, AddaccountComponent, ViewaccountComponent]
})
export class AccountModule { }
