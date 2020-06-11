import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicereturnComponent } from './invoicereturn.component';

describe('InvoicereturnComponent', () => {
  let component: InvoicereturnComponent;
  let fixture: ComponentFixture<InvoicereturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicereturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicereturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
