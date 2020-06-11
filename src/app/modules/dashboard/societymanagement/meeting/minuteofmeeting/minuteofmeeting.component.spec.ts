import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinuteofmeetingComponent } from './minuteofmeeting.component';

describe('MinuteofmeetingComponent', () => {
  let component: MinuteofmeetingComponent;
  let fixture: ComponentFixture<MinuteofmeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinuteofmeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinuteofmeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
