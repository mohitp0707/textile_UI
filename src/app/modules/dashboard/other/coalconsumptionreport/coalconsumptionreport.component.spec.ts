import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoalconsumptionreportComponent } from './coalconsumptionreport.component';

describe('CoalconsumptionreportComponent', () => {
  let component: CoalconsumptionreportComponent;
  let fixture: ComponentFixture<CoalconsumptionreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoalconsumptionreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoalconsumptionreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
