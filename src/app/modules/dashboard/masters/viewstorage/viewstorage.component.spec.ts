import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewstorageComponent } from './viewstorage.component';

describe('ViewstorageComponent', () => {
  let component: ViewstorageComponent;
  let fixture: ComponentFixture<ViewstorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewstorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewstorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
