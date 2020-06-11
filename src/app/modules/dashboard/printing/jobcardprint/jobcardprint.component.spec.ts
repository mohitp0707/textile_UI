import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobcardprintComponent } from './jobcardprint.component';

describe('JobcardprintComponent', () => {
  let component: JobcardprintComponent;
  let fixture: ComponentFixture<JobcardprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobcardprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobcardprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
