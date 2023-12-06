export interface LoanTransactionHistoryModel {
  amountPaid: number;
  balance: number;
  paidAt: string;
  paymentStatus: string;
  [key: string]: any;
}
