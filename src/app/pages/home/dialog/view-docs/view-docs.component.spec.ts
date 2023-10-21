import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocsComponent } from './view-docs.component';

describe('ViewDocsComponent', () => {
  let component: ViewDocsComponent;
  let fixture: ComponentFixture<ViewDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDocsComponent]
    });
    fixture = TestBed.createComponent(ViewDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
