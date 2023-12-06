import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCustomerComponent } from './total-customer.component';

describe('TotalCustomerComponent', () => {
  let component: TotalCustomerComponent;
  let fixture: ComponentFixture<TotalCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalCustomerComponent]
    });
    fixture = TestBed.createComponent(TotalCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
