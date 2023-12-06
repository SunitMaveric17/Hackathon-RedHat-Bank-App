import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSavingsAccountComponent } from './customer-savings-account.component';

describe('CustomerSavingsAccountComponent', () => {
  let component: CustomerSavingsAccountComponent;
  let fixture: ComponentFixture<CustomerSavingsAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerSavingsAccountComponent]
    });
    fixture = TestBed.createComponent(CustomerSavingsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
