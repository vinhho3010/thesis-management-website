import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncilDetailComponent } from './council-detail.component';

describe('CouncilDetailComponent', () => {
  let component: CouncilDetailComponent;
  let fixture: ComponentFixture<CouncilDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouncilDetailComponent]
    });
    fixture = TestBed.createComponent(CouncilDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
