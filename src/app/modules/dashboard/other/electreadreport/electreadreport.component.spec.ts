import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectreadreportComponent } from './electreadreport.component';

describe('ElectreadreportComponent', () => {
  let component: ElectreadreportComponent;
  let fixture: ComponentFixture<ElectreadreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectreadreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectreadreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
