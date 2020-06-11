import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackreportComponent } from './trackreport.component';

describe('TrackreportComponent', () => {
  let component: TrackreportComponent;
  let fixture: ComponentFixture<TrackreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
