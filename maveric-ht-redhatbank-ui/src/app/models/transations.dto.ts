export interface TransactionDto {
    date: string;
    description: string;
    amount: number;
    balance: number;
    type: string;
    [key: string]: any;
  }