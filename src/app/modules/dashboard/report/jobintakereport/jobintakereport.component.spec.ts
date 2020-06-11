import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobintakereportComponent } from './jobintakereport.component';

describe('JobintakereportComponent', () => {
  let component: JobintakereportComponent;
  let fixture: ComponentFixture<JobintakereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobintakereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobintakereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
