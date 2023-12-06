import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSavingsAccountComponent } from './add-savings-account.component';

describe('AddSavingsAccountComponent', () => {
  let component: AddSavingsAccountComponent;
  let fixture: ComponentFixture<AddSavingsAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSavingsAccountComponent]
    });
    fixture = TestBed.createComponent(AddSavingsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
