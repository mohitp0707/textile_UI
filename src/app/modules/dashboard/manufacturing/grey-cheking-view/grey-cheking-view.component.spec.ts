import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreyChekingViewComponent } from './grey-cheking-view.component';

describe('GreyChekingViewComponent', () => {
  let component: GreyChekingViewComponent;
  let fixture: ComponentFixture<GreyChekingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreyChekingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreyChekingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
