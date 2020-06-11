import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockoutviewComponent } from './stockoutview.component';

describe('StockoutviewComponent', () => {
  let component: StockoutviewComponent;
  let fixture: ComponentFixture<StockoutviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockoutviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockoutviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
