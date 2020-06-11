import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinewiseprocessComponent } from './machinewiseprocess.component';

describe('MachinewiseprocessComponent', () => {
  let component: MachinewiseprocessComponent;
  let fixture: ComponentFixture<MachinewiseprocessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachinewiseprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinewiseprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
