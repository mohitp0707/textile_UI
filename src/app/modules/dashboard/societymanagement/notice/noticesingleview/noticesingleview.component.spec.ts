import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticesingleviewComponent } from './noticesingleview.component';

describe('NoticesingleviewComponent', () => {
  let component: NoticesingleviewComponent;
  let fixture: ComponentFixture<NoticesingleviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticesingleviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticesingleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
