import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionDto } from '../models/transations.dto';

@Injectable({
  providedIn: 'root',
})
export class CustomerTransactionService {
  apiGateWayUrl =
    'https://saving-service-senthilkn-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/';
  apiVersion = 'api/v1/';
  transactionBaseUrl =
    this.apiGateWayUrl + this.apiVersion + 'accounts/saving/';
  savingsCustomerUrl =
    this.apiGateWayUrl + this.apiVersion + 'accounts/saving/';
  constructor(private http: HttpClient) {}

  getTransactionsForSavingsAccount(
    savingsAccountId: number,
    pageNumber: number,
    pageSize: number
  ): Observable<TransactionDto[]> {
    const url =
      this.savingsCustomerUrl +
      savingsAccountId +
      '/transactions?pageNumber=0&pagesize=1000';
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<TransactionDto[]>(url);
  }
  withdrawAmount(accountId: number, amount: number): Observable<any> {
    const withdrawalUrl = this.transactionBaseUrl + 'withdraws';

    const withdrawalBody = {
      amount: amount,
      accountId: accountId,
    };

    return this.http.put(withdrawalUrl, withdrawalBody);
  }

  depositsAmount(accountId: number, amount: number): Observable<any> {
    const depositUrl = this.transactionBaseUrl + 'deposits';

    const deposityBody = {
      amount: amount,
      accountId: accountId,
    };

    return this.http.put(depositUrl, deposityBody);
  }
  overDraftAmount(requestBody: any): Observable<any> {
    return this.http.put(this.transactionBaseUrl, requestBody);
  }

  accountClosed(id:number): Observable<any> {
    const body={
      "savingAccountId": id,
      "isAllowOverDraft": null, 
      "overDraftLimit": 0,
      "status": "CLOSED"
    }
    return this.http.put(this.transactionBaseUrl, body);
  }
}
