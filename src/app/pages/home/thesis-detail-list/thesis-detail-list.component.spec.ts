import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisDetailListComponent } from './thesis-detail-list.component';

describe('ThesisDetailListComponent', () => {
  let component: ThesisDetailListComponent;
  let fixture: ComponentFixture<ThesisDetailListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThesisDetailListComponent]
    });
    fixture = TestBed.createComponent(ThesisDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
