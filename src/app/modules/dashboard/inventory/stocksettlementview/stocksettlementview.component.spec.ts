import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksettlementviewComponent } from './stocksettlementview.component';

describe('StocksettlementviewComponent', () => {
  let component: StocksettlementviewComponent;
  let fixture: ComponentFixture<StocksettlementviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksettlementviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksettlementviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
