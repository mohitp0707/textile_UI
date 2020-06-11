import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreyCheckingReportComponent } from './grey-checking-report.component';

describe('GreyCheckingReportComponent', () => {
  let component: GreyCheckingReportComponent;
  let fixture: ComponentFixture<GreyCheckingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreyCheckingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreyCheckingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
