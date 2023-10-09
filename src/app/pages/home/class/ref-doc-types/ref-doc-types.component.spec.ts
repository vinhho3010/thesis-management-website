import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefDocTypesComponent } from './ref-doc-types.component';

describe('RefDocTypesComponent', () => {
  let component: RefDocTypesComponent;
  let fixture: ComponentFixture<RefDocTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefDocTypesComponent]
    });
    fixture = TestBed.createComponent(RefDocTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
