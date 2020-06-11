import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherchargeComponent } from './othercharge.component';

describe('OtherchargeComponent', () => {
  let component: OtherchargeComponent;
  let fixture: ComponentFixture<OtherchargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherchargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
