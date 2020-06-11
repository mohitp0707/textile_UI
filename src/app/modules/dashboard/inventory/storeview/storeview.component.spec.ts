import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreviewComponent } from './storeview.component';

describe('StoreviewComponent', () => {
  let component: StoreviewComponent;
  let fixture: ComponentFixture<StoreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
