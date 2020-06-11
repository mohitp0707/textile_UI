import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreyReceiveReportComponent } from './grey-receive-report.component';

describe('GreyReceiveReportComponent', () => {
  let component: GreyReceiveReportComponent;
  let fixture: ComponentFixture<GreyReceiveReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreyReceiveReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreyReceiveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
