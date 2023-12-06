import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCountComponent } from './customer-count.component';

describe('CustomerCountComponent', () => {
  let component: CustomerCountComponent;
  let fixture: ComponentFixture<CustomerCountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerCountComponent]
    });
    fixture = TestBed.createComponent(CustomerCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
