import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchviewComponent } from './dispatchview.component';

describe('DispatchviewComponent', () => {
  let component: DispatchviewComponent;
  let fixture: ComponentFixture<DispatchviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
