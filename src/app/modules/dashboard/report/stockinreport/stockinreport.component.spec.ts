import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockinreportComponent } from './stockinreport.component';

describe('StockinreportComponent', () => {
  let component: StockinreportComponent;
  let fixture: ComponentFixture<StockinreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockinreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockinreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
