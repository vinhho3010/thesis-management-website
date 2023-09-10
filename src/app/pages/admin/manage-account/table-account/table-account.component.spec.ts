import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAccountComponent } from './table-account.component';

describe('TableAccountComponent', () => {
  let component: TableAccountComponent;
  let fixture: ComponentFixture<TableAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableAccountComponent]
    });
    fixture = TestBed.createComponent(TableAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
