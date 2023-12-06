export interface SavingsAccountModel {
  savingsAccountId: number;
  customerId: number;
  customerName: string;
  customerPhone: string;
  minOpeningBalance?: number;
  interestCompoundPeriod?: string;
  isAllowOverDraft?: boolean;
  overDraftLimit?: number;
  status?: string;
  [key: string]: any;
}
