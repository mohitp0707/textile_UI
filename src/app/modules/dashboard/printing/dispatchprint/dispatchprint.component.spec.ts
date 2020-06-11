import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchprintComponent } from './dispatchprint.component';

describe('DispatchprintComponent', () => {
  let component: DispatchprintComponent;
  let fixture: ComponentFixture<DispatchprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
