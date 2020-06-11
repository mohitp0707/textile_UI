import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmeetingComponent } from './viewmeeting.component';

describe('ViewmeetingComponent', () => {
  let component: ViewmeetingComponent;
  let fixture: ComponentFixture<ViewmeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
