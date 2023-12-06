export interface CustomerModel {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  createdAt?: Date;
  modifiedAt?: Date;
  [key: string]: any;
}
