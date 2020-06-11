import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessviewComponent } from './processview.component';

describe('ProcessviewComponent', () => {
  let component: ProcessviewComponent;
  let fixture: ComponentFixture<ProcessviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
