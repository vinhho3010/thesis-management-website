import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedCouncilComponent } from './assigned-council.component';

describe('AssignedCouncilComponent', () => {
  let component: AssignedCouncilComponent;
  let fixture: ComponentFixture<AssignedCouncilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedCouncilComponent]
    });
    fixture = TestBed.createComponent(AssignedCouncilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
