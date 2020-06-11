import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockinviewComponent } from './stockinview.component';

describe('StockinviewComponent', () => {
  let component: StockinviewComponent;
  let fixture: ComponentFixture<StockinviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockinviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockinviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
