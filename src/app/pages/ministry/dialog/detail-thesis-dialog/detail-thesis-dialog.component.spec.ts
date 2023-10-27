import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailThesisDialogComponent } from './detail-thesis-dialog.component';

describe('DetailThesisDialogComponent', () => {
  let component: DetailThesisDialogComponent;
  let fixture: ComponentFixture<DetailThesisDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailThesisDialogComponent]
    });
    fixture = TestBed.createComponent(DetailThesisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
