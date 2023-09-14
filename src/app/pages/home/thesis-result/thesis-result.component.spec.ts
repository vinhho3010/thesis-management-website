import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisResultComponent } from './thesis-result.component';

describe('ThesisResultComponent', () => {
  let component: ThesisResultComponent;
  let fixture: ComponentFixture<ThesisResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThesisResultComponent]
    });
    fixture = TestBed.createComponent(ThesisResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
