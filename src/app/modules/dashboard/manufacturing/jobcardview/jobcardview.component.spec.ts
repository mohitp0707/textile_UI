import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobcardviewComponent } from './jobcardview.component';

describe('JobcardviewComponent', () => {
  let component: JobcardviewComponent;
  let fixture: ComponentFixture<JobcardviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobcardviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobcardviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
