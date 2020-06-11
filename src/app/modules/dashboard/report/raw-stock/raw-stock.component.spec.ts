import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawStockComponent } from './raw-stock.component';

describe('RawStockComponent', () => {
  let component: RawStockComponent;
  let fixture: ComponentFixture<RawStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
