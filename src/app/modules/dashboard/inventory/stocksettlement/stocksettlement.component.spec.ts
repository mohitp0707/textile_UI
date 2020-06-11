import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksettlementComponent } from './stocksettlement.component';

describe('StocksettlementComponent', () => {
  let component: StocksettlementComponent;
  let fixture: ComponentFixture<StocksettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
