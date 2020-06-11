import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewnoticeComponent } from './viewnotice.component';

describe('ViewnoticeComponent', () => {
  let component: ViewnoticeComponent;
  let fixture: ComponentFixture<ViewnoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewnoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewnoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
