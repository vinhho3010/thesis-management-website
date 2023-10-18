import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMilestoneComponent } from './add-milestone.component';

describe('AddMilestoneComponent', () => {
  let component: AddMilestoneComponent;
  let fixture: ComponentFixture<AddMilestoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMilestoneComponent]
    });
    fixture = TestBed.createComponent(AddMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
