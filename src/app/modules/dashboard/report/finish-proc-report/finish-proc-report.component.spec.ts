import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishProcReportComponent } from './finish-proc-report.component';

describe('FinishProcReportComponent', () => {
  let component: FinishProcReportComponent;
  let fixture: ComponentFixture<FinishProcReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishProcReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishProcReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
