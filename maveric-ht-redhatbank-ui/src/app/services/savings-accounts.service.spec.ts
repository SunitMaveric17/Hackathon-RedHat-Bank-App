import { TestBed } from '@angular/core/testing';

import { SavingsAccountsService } from './savings-accounts.service';

describe('SavingsAccountsService', () => {
  let service: SavingsAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingsAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
