import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncilComponent } from './council.component';

describe('CouncilComponent', () => {
  let component: CouncilComponent;
  let fixture: ComponentFixture<CouncilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouncilComponent]
    });
    fixture = TestBed.createComponent(CouncilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
