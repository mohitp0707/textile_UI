import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DocumentComponent } from './document/document.component';
import { AdddocumentComponent } from './adddocument/adddocument.component';
import { ViewdocumentComponent } from './viewdocument/viewdocument.component';
import { DocumentsingleviewComponent } from './documentsingleview/documentsingleview.component';

const routes: Routes = 
	[
		{ path : '', component : DocumentComponent },
		{ path : 'add-document', component : AdddocumentComponent },
		{ path : 'add-document/:id', component : AdddocumentComponent },
		{ path : 'view-document', component : ViewdocumentComponent },
		{ path : 'view-document/:id', component : DocumentsingleviewComponent }
	];

@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	NgbModule,
	RouterModule.forChild(routes)
  ],
  declarations: [ DocumentComponent, AdddocumentComponent, ViewdocumentComponent, DocumentsingleviewComponent ]
})
export class DocumentModule { }
