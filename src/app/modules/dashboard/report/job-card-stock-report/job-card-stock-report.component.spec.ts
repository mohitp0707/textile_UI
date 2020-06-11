import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCardStockReportComponent } from './job-card-stock-report.component';

describe('JobCardStockReportComponent', () => {
  let component: JobCardStockReportComponent;
  let fixture: ComponentFixture<JobCardStockReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCardStockReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCardStockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
