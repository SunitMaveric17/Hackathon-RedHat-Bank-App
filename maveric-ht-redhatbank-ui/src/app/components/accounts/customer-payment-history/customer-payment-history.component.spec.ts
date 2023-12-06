import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPaymentHistoryComponent } from './customer-payment-history.component';

describe('CustomerPaymentHistoryComponent', () => {
  let component: CustomerPaymentHistoryComponent;
  let fixture: ComponentFixture<CustomerPaymentHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerPaymentHistoryComponent]
    });
    fixture = TestBed.createComponent(CustomerPaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
