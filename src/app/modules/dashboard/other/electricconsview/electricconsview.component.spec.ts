import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricconsviewComponent } from './electricconsview.component';

describe('ElectricconsviewComponent', () => {
  let component: ElectricconsviewComponent;
  let fixture: ComponentFixture<ElectricconsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricconsviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricconsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
