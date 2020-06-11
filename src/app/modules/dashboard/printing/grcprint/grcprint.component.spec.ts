import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrcprintComponent } from './grcprint.component';

describe('GrcprintComponent', () => {
  let component: GrcprintComponent;
  let fixture: ComponentFixture<GrcprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrcprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrcprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
