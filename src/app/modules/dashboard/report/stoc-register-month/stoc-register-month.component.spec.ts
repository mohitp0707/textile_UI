import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocRegisterMonthComponent } from './stoc-register-month.component';

describe('StocRegisterMonthComponent', () => {
  let component: StocRegisterMonthComponent;
  let fixture: ComponentFixture<StocRegisterMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocRegisterMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocRegisterMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
