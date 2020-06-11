import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoalviewComponent } from './coalview.component';

describe('CoalviewComponent', () => {
  let component: CoalviewComponent;
  let fixture: ComponentFixture<CoalviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoalviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoalviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
