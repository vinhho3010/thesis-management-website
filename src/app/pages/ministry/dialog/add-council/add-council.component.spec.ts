import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCouncilComponent } from './add-council.component';

describe('AddCouncilComponent', () => {
  let component: AddCouncilComponent;
  let fixture: ComponentFixture<AddCouncilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCouncilComponent]
    });
    fixture = TestBed.createComponent(AddCouncilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
