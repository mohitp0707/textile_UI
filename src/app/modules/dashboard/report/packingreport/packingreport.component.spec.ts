import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingreportComponent } from './packingreport.component';

describe('PackingreportComponent', () => {
  let component: PackingreportComponent;
  let fixture: ComponentFixture<PackingreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
