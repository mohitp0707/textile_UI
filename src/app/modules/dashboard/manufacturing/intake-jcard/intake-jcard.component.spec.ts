import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeJcardComponent } from './intake-jcard.component';

describe('IntakeJcardComponent', () => {
  let component: IntakeJcardComponent;
  let fixture: ComponentFixture<IntakeJcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakeJcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeJcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
