import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './filter.pipe';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { UsersingleviewComponent } from './usersingleview/usersingleview.component';
import { UserroleComponent } from './userrole/userrole.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';

const routes: Routes = 
	[
		{ path : '', component : ManageuserComponent },
		{ path : 'add-user', component : AdduserComponent },
		{ path : 'userrole', component : UserroleComponent },
		{ path : 'passreset', component : PasswordresetComponent },
	];

@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	NgbModule,
	RouterModule.forChild(routes)
  ],
  declarations: [FilterPipe,ManageuserComponent, AdduserComponent, ViewuserComponent, UsersingleviewComponent, UserroleComponent, PasswordresetComponent]
})
export class ManageuserModule { }
