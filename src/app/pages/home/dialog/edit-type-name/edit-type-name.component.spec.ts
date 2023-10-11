import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeNameComponent } from './edit-type-name.component';

describe('EditTypeNameComponent', () => {
  let component: EditTypeNameComponent;
  let fixture: ComponentFixture<EditTypeNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTypeNameComponent]
    });
    fixture = TestBed.createComponent(EditTypeNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
