import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingStudentListComponent } from './pending-student-list.component';

describe('PendingStudentListComponent', () => {
  let component: PendingStudentListComponent;
  let fixture: ComponentFixture<PendingStudentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingStudentListComponent]
    });
    fixture = TestBed.createComponent(PendingStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
