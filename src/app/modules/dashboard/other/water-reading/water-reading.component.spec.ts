import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterReadingComponent } from './water-reading.component';

describe('WaterReadingComponent', () => {
  let component: WaterReadingComponent;
  let fixture: ComponentFixture<WaterReadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterReadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
