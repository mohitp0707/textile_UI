import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreyRecieveviewComponent } from './grey-recieveview.component';

describe('GreyRecieveviewComponent', () => {
  let component: GreyRecieveviewComponent;
  let fixture: ComponentFixture<GreyRecieveviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreyRecieveviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreyRecieveviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
