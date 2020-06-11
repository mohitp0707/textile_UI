import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionVoucherViewComponent } from './transaction-voucher-view.component';

describe('TransactionVoucherViewComponent', () => {
  let component: TransactionVoucherViewComponent;
  let fixture: ComponentFixture<TransactionVoucherViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionVoucherViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionVoucherViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
