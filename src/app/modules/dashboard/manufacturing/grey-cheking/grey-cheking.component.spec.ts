import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreyChekingComponent } from './grey-cheking.component';

describe('GreyChekingComponent', () => {
  let component: GreyChekingComponent;
  let fixture: ComponentFixture<GreyChekingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreyChekingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreyChekingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
