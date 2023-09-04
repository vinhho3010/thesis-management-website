import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefDocumentsComponent } from './ref-documents.component';

describe('RefDocumentsComponent', () => {
  let component: RefDocumentsComponent;
  let fixture: ComponentFixture<RefDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefDocumentsComponent]
    });
    fixture = TestBed.createComponent(RefDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
