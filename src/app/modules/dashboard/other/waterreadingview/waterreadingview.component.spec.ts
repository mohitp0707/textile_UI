import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterreadingviewComponent } from './waterreadingview.component';

describe('WaterreadingviewComponent', () => {
  let component: WaterreadingviewComponent;
  let fixture: ComponentFixture<WaterreadingviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterreadingviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterreadingviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
