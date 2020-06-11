import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersingleviewComponent } from './usersingleview.component';

describe('UsersingleviewComponent', () => {
  let component: UsersingleviewComponent;
  let fixture: ComponentFixture<UsersingleviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersingleviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersingleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
