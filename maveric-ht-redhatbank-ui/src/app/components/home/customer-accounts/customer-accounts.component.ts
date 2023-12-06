import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css'],
})
export class CustomerAccountsComponent {
  constructor(private router: Router) {}

  openCustomerAccounts() {
    this.router.navigateByUrl('/customer-accounts');
  }
}
