import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedDetailComponent } from './assigned-detail.component';

describe('AssignedDetailComponent', () => {
  let component: AssignedDetailComponent;
  let fixture: ComponentFixture<AssignedDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedDetailComponent]
    });
    fixture = TestBed.createComponent(AssignedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
