import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThesisToCouncilComponent } from './add-thesis-to-council.component';

describe('AddThesisToCouncilComponent', () => {
  let component: AddThesisToCouncilComponent;
  let fixture: ComponentFixture<AddThesisToCouncilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddThesisToCouncilComponent]
    });
    fixture = TestBed.createComponent(AddThesisToCouncilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
