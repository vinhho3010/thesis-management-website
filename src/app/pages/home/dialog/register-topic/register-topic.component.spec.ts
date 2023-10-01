import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTopicDialogComponent } from './register-topic.component';

describe('RegisterTopicDialogComponent', () => {
  let component: RegisterTopicDialogComponent;
  let fixture: ComponentFixture<RegisterTopicDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterTopicDialogComponent]
    });
    fixture = TestBed.createComponent(RegisterTopicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
