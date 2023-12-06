import { CustomerModel } from './customer.model';

export interface CustomerResponse {
  data: CustomerModel;
  status: number;
}
