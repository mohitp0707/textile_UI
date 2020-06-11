import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingviewComponent } from './packingview.component';

describe('PackingviewComponent', () => {
  let component: PackingviewComponent;
  let fixture: ComponentFixture<PackingviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
