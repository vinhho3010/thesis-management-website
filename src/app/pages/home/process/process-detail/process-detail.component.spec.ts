import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDetailComponent } from './process-detail.component';

describe('ProcessDetailComponent', () => {
  let component: ProcessDetailComponent;
  let fixture: ComponentFixture<ProcessDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessDetailComponent]
    });
    fixture = TestBed.createComponent(ProcessDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
