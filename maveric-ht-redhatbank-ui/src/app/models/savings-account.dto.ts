export interface SavingsAccountDTO {
  savingsAccountId: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: number;
  minOpeningBalance: number;
  interestCompoundPeriod: string;
  isAllowOverDraft: boolean;
  overDraftLimit: number;
  documentName: string;
  createdDate: Date;
  updatedDate: Date;
  balance: number;
  status: string;
  city: string;
  [key: string]: any;
}
