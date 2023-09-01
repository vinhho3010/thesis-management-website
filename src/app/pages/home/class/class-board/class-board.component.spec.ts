import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassBoardComponent } from './class-board.component';

describe('ClassBoardComponent', () => {
  let component: ClassBoardComponent;
  let fixture: ComponentFixture<ClassBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassBoardComponent]
    });
    fixture = TestBed.createComponent(ClassBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
