import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishgoodReportComponent } from './finishgood-report.component';

describe('FinishgoodReportComponent', () => {
  let component: FinishgoodReportComponent;
  let fixture: ComponentFixture<FinishgoodReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishgoodReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishgoodReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
