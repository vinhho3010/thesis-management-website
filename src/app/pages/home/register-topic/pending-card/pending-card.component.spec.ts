import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCardComponent } from './pending-card.component';

describe('PendingCardComponent', () => {
  let component: PendingCardComponent;
  let fixture: ComponentFixture<PendingCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingCardComponent]
    });
    fixture = TestBed.createComponent(PendingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
