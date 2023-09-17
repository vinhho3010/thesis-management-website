import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistryLayoutComponent } from './ministry-layout.component';

describe('MinistryLayoutComponent', () => {
  let component: MinistryLayoutComponent;
  let fixture: ComponentFixture<MinistryLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinistryLayoutComponent]
    });
    fixture = TestBed.createComponent(MinistryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
