import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFileAccountComponent } from './add-file-account.component';

describe('AddFileAccountComponent', () => {
  let component: AddFileAccountComponent;
  let fixture: ComponentFixture<AddFileAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFileAccountComponent]
    });
    fixture = TestBed.createComponent(AddFileAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
