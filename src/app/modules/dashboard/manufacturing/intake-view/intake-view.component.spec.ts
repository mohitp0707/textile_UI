import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeViewComponent } from './intake-view.component';

describe('IntakeViewComponent', () => {
  let component: IntakeViewComponent;
  let fixture: ComponentFixture<IntakeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
