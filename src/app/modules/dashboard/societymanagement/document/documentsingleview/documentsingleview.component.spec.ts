import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsingleviewComponent } from './documentsingleview.component';

describe('DocumentsingleviewComponent', () => {
  let component: DocumentsingleviewComponent;
  let fixture: ComponentFixture<DocumentsingleviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsingleviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsingleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
