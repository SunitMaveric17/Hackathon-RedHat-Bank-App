export interface LoanAccountsModel {
  loanId: number;
  customerId: number;
  customerName: string;
  email: string;
  loanAmount: number;
  savingsAccount: number;
  phoneNumber: string;
  status: string;
  [key: string]: any;
}
