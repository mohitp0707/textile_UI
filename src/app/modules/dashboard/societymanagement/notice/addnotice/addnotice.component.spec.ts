import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnoticeComponent } from './addnotice.component';

describe('AddnoticeComponent', () => {
  let component: AddnoticeComponent;
  let fixture: ComponentFixture<AddnoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
