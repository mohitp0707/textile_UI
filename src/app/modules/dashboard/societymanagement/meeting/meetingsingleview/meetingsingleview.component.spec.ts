import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsingleviewComponent } from './meetingsingleview.component';

describe('MeetingsingleviewComponent', () => {
  let component: MeetingsingleviewComponent;
  let fixture: ComponentFixture<MeetingsingleviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsingleviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsingleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
