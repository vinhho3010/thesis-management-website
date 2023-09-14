import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTopicComponent } from './register-topic.component';

describe('RegisterTopicComponent', () => {
  let component: RegisterTopicComponent;
  let fixture: ComponentFixture<RegisterTopicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterTopicComponent]
    });
    fixture = TestBed.createComponent(RegisterTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
