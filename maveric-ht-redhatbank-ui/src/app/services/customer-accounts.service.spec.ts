import { TestBed } from '@angular/core/testing';

import { CustomerAccountsService } from './customer-accounts.service';

describe('CustomerAccountsService', () => {
  let service: CustomerAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
