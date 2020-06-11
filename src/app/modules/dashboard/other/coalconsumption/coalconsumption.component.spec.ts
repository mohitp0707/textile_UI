import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoalconsumptionComponent } from './coalconsumption.component';

describe('CoalconsumptionComponent', () => {
  let component: CoalconsumptionComponent;
  let fixture: ComponentFixture<CoalconsumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoalconsumptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoalconsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
