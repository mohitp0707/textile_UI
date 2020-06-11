import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsingleviewComponent } from './complaintsingleview.component';

describe('ComplaintsingleviewComponent', () => {
  let component: ComplaintsingleviewComponent;
  let fixture: ComponentFixture<ComplaintsingleviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintsingleviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsingleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
