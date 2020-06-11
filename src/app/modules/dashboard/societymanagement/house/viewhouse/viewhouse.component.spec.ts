import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewhouseComponent } from './viewhouse.component';

describe('ViewhouseComponent', () => {
  let component: ViewhouseComponent;
  let fixture: ComponentFixture<ViewhouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewhouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewhouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
