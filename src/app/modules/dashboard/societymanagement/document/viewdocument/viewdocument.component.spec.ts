import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdocumentComponent } from './viewdocument.component';

describe('ViewdocumentComponent', () => {
  let component: ViewdocumentComponent;
  let fixture: ComponentFixture<ViewdocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
