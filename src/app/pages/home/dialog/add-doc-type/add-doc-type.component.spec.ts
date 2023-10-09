import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocTypeComponent } from './add-doc-type.component';

describe('AddDocTypeComponent', () => {
  let component: AddDocTypeComponent;
  let fixture: ComponentFixture<AddDocTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDocTypeComponent]
    });
    fixture = TestBed.createComponent(AddDocTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
