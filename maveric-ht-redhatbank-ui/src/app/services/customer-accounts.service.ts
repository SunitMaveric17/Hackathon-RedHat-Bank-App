import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CustomerModel } from '../models/customer.model';
import { ManyCustomerApiResponse } from '../models/many-customer-api-response.model';
import { CustomerResponse } from '../models/customer-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerAccountsService {
  constructor(private http: HttpClient) {}
  apiGateWayUrl = 'https://customer-service-senthilkn-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com';
  apiVersion = '/api/v1';
  getAllCustomersUrl: string =
    this.apiGateWayUrl + this.apiVersion + '/customers/search';
  getSearchCustomersUrl: string =
    this.apiGateWayUrl + this.apiVersion + '/customers/search?searchValue';
  addCustomerUrl: string = this.apiGateWayUrl + this.apiVersion + '/customers';
  modifyCustomerUrl: string =
    this.apiGateWayUrl + this.apiVersion + '/customers';
  getCustomerUrl: string =
    this.apiGateWayUrl +
    this.apiVersion +
    '/customers/searchByCustomerId?CustomerId';

  getAllCustomers(): Observable<CustomerModel[]> {
    return this.http
      .get<ManyCustomerApiResponse>(this.getAllCustomersUrl)
      .pipe(map((response) => response.data));
  }
  getSearchCustomers(search: string): Observable<CustomerModel[]> {
    return this.http
      .get<ManyCustomerApiResponse>(this.getSearchCustomersUrl + '=' + search)
      .pipe(map((Response) => Response.data));
  }
  getCustomer(customerId: number): Observable<CustomerModel> {
    return this.http
      .get<CustomerResponse>(this.getCustomerUrl + '=' + customerId)
      .pipe(map((response) => response.data));
  }
  addCustomer(body: CustomerModel) {
    return this.http.post(this.addCustomerUrl, body);
  }
  modifyCustomer(customerId: number, body: CustomerModel) {
    return this.http.put(this.modifyCustomerUrl + '/' + customerId, body);
  }
}
