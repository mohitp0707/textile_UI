import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DyingProcReportComponent } from './dying-proc-report.component';

describe('DyingProcReportComponent', () => {
  let component: DyingProcReportComponent;
  let fixture: ComponentFixture<DyingProcReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DyingProcReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyingProcReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
