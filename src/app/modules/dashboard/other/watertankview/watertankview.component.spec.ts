import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatertankviewComponent } from './watertankview.component';

describe('WatertankviewComponent', () => {
  let component: WatertankviewComponent;
  let fixture: ComponentFixture<WatertankviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatertankviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatertankviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
