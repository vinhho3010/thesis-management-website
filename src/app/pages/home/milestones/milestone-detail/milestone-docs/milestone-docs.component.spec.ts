import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneDocsComponent } from './milestone-docs.component';

describe('MilestoneDocsComponent', () => {
  let component: MilestoneDocsComponent;
  let fixture: ComponentFixture<MilestoneDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MilestoneDocsComponent]
    });
    fixture = TestBed.createComponent(MilestoneDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
