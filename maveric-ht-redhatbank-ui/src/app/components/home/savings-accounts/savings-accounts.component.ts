import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-savings-accounts',
  templateUrl: './savings-accounts.component.html',
  styleUrls: ['./savings-accounts.component.css']
})
export class SavingsAccountsComponent {


  routeToSavingsTable(){
    this.router.navigateByUrl('/customer-savings-account');
  }

  constructor(private router: Router){}

  openSavingsAccounts(){
    this.router.navigateByUrl("/savings-accounts");
  }

}
