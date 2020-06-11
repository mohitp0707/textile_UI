import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesingleviewComponent } from './housesingleview.component';

describe('HousesingleviewComponent', () => {
  let component: HousesingleviewComponent;
  let fixture: ComponentFixture<HousesingleviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousesingleviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousesingleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
