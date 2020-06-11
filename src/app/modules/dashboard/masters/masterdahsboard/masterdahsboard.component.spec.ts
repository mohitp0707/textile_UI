import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterdahsboardComponent } from './masterdahsboard.component';

describe('MasterdahsboardComponent', () => {
  let component: MasterdahsboardComponent;
  let fixture: ComponentFixture<MasterdahsboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterdahsboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterdahsboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
