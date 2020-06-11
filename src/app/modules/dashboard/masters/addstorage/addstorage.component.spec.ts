import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstorageComponent } from './addstorage.component';

describe('AddstorageComponent', () => {
  let component: AddstorageComponent;
  let fixture: ComponentFixture<AddstorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddstorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
