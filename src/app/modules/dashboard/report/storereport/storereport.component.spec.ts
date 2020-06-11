import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorereportComponent } from './storereport.component';

describe('StorereportComponent', () => {
  let component: StorereportComponent;
  let fixture: ComponentFixture<StorereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
