import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksingleviewComponent } from './tasksingleview.component';

describe('TasksingleviewComponent', () => {
  let component: TasksingleviewComponent;
  let fixture: ComponentFixture<TasksingleviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksingleviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksingleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
