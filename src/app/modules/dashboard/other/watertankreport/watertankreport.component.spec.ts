import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatertankreportComponent } from './watertankreport.component';

describe('WatertankreportComponent', () => {
  let component: WatertankreportComponent;
  let fixture: ComponentFixture<WatertankreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatertankreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatertankreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
