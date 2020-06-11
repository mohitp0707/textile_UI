import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricconsumptionComponent } from './electricconsumption.component';

describe('ElectricconsumptionComponent', () => {
  let component: ElectricconsumptionComponent;
  let fixture: ComponentFixture<ElectricconsumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricconsumptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricconsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
