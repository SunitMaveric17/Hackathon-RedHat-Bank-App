import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsAccountsComponent } from './savings-accounts.component';

describe('SavingsAccountsComponent', () => {
  let component: SavingsAccountsComponent;
  let fixture: ComponentFixture<SavingsAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsAccountsComponent]
    });
    fixture = TestBed.createComponent(SavingsAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
