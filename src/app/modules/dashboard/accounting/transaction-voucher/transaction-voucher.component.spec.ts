import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionVoucherComponent } from './transaction-voucher.component';

describe('TransactionVoucherComponent', () => {
  let component: TransactionVoucherComponent;
  let fixture: ComponentFixture<TransactionVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
