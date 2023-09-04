import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveStudentListComponent } from './active-student-list.component';

describe('ActiveStudentListComponent', () => {
  let component: ActiveStudentListComponent;
  let fixture: ComponentFixture<ActiveStudentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveStudentListComponent]
    });
    fixture = TestBed.createComponent(ActiveStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
