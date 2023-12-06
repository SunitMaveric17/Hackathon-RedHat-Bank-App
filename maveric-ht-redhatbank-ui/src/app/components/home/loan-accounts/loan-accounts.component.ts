import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-accounts',
  templateUrl: './loan-accounts.component.html',
  styleUrls: ['./loan-accounts.component.css'],
})
export class LoanAccountsComponent {
  constructor(private router: Router) {}

  openLoanAccounts() {
    this.router.navigateByUrl('/loan-accounts');
  }
}
