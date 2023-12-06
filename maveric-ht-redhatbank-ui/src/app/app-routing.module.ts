import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomeComponent } from './components/home/home.component';
import { CustomerAccountComponent } from './components/accounts/customer-account/customer-account.component';
import { SavingsAccountComponent } from './components/accounts/savings-account/savings-account.component';
import { LoanAccountComponent } from './components/accounts/loan-account/loan-account.component';
import { CustomerSavingsAccountComponent } from './components/accounts/customer-savings-account/customer-savings-account.component';
import { CustomerPaymentHistoryComponent } from './components/accounts/customer-payment-history/customer-payment-history.component';
import { WrongPageComponentComponent } from './shared/components/wrong-page-component/wrong-page-component.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'customer-accounts',
    component: CustomerAccountComponent,
  },
  {
    path: 'savings-accounts',
    component: SavingsAccountComponent,
  },
  {
    path: 'loan-accounts',
    component: LoanAccountComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'customer-savings-account',
    component: CustomerSavingsAccountComponent,
  },
  {
    path: 'customer-payment-history/:customerId/:customerName/:loanAmt/:account/:loanId/:status',
    component: CustomerPaymentHistoryComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: WrongPageComponentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
