import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostReportComponent } from './cost-report.component';

describe('CostReportComponent', () => {
  let component: CostReportComponent;
  let fixture: ComponentFixture<CostReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
