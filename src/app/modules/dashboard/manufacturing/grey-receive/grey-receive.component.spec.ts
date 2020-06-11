import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreyReceiveComponent } from './grey-receive.component';

describe('GreyReceiveComponent', () => {
  let component: GreyReceiveComponent;
  let fixture: ComponentFixture<GreyReceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreyReceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreyReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
