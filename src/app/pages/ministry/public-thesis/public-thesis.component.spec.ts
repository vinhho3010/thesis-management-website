import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicThesisComponent } from './public-thesis.component';

describe('PublicThesisComponent', () => {
  let component: PublicThesisComponent;
  let fixture: ComponentFixture<PublicThesisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicThesisComponent]
    });
    fixture = TestBed.createComponent(PublicThesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
