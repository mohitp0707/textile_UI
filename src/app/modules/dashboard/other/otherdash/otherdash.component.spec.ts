import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherdashComponent } from './otherdash.component';

describe('OtherdashComponent', () => {
  let component: OtherdashComponent;
  let fixture: ComponentFixture<OtherdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
