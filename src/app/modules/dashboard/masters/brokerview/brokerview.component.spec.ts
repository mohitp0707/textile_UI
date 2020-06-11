import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerviewComponent } from './brokerview.component';

describe('BrokerviewComponent', () => {
  let component: BrokerviewComponent;
  let fixture: ComponentFixture<BrokerviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
