import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingprintComponent } from './packingprint.component';

describe('PackingprintComponent', () => {
  let component: PackingprintComponent;
  let fixture: ComponentFixture<PackingprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
