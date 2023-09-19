import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisCardComponent } from './thesis-card.component';

describe('ThesisCardComponent', () => {
  let component: ThesisCardComponent;
  let fixture: ComponentFixture<ThesisCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThesisCardComponent]
    });
    fixture = TestBed.createComponent(ThesisCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
