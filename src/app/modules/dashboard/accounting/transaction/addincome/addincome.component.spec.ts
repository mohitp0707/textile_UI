import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddincomeComponent } from './addincome.component';

describe('AddincomeComponent', () => {
  let component: AddincomeComponent;
  let fixture: ComponentFixture<AddincomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddincomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddincomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
