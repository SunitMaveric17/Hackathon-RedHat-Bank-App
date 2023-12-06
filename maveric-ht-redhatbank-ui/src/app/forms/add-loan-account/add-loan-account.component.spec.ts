import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanAccountComponent } from './add-loan-account.component';

describe('AddLoanAccountComponent', () => {
  let component: AddLoanAccountComponent;
  let fixture: ComponentFixture<AddLoanAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLoanAccountComponent]
    });
    fixture = TestBed.createComponent(AddLoanAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
