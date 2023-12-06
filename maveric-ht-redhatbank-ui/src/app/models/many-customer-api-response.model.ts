import { CustomerModel } from "./customer.model";

export interface ManyCustomerApiResponse {
    status: number;
    data: CustomerModel[];
  }