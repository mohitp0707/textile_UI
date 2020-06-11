import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockoutreportComponent } from './stockoutreport.component';

describe('StockoutreportComponent', () => {
  let component: StockoutreportComponent;
  let fixture: ComponentFixture<StockoutreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockoutreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockoutreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
