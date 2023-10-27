import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneStudentsComponent } from './milestone-students.component';

describe('MilestoneStudentsComponent', () => {
  let component: MilestoneStudentsComponent;
  let fixture: ComponentFixture<MilestoneStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MilestoneStudentsComponent]
    });
    fixture = TestBed.createComponent(MilestoneStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
