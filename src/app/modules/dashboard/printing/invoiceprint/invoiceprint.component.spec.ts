import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceprintComponent } from './invoiceprint.component';

describe('InvoiceprintComponent', () => {
  let component: InvoiceprintComponent;
  let fixture: ComponentFixture<InvoiceprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
