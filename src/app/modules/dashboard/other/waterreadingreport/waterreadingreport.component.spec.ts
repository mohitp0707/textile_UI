import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterreadingreportComponent } from './waterreadingreport.component';

describe('WaterreadingreportComponent', () => {
  let component: WaterreadingreportComponent;
  let fixture: ComponentFixture<WaterreadingreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterreadingreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterreadingreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
