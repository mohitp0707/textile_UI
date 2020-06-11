import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcomplaintComponent } from './viewcomplaint.component';

describe('ViewcomplaintComponent', () => {
  let component: ViewcomplaintComponent;
  let fixture: ComponentFixture<ViewcomplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcomplaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcomplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
