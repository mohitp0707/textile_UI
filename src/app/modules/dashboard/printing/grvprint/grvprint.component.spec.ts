import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrvprintComponent } from './grvprint.component';

describe('GrvprintComponent', () => {
  let component: GrvprintComponent;
  let fixture: ComponentFixture<GrvprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrvprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrvprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
