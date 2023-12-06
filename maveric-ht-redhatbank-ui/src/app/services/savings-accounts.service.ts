import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SavingsAccountModel } from '../models/savings-account.model';
import { SavingsAccountDTO } from '../models/savings-account.dto';



@Injectable({
  providedIn: 'root',
})
export class SavingsAccountsService {
  constructor(private http: HttpClient) {}
  apiGateWayUrl =
    'https://saving-service-senthilkn-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/';
  apiVersion = 'api/v1/';
  getAllSavingsAccountsUrl: string =
    this.apiGateWayUrl + this.apiVersion + 'accounts/saving';
  getSearchSavingsAccountsUrl: string =
    this.apiGateWayUrl + this.apiVersion + 'accounts/saving';
  addSavingsAccountUrl: string =
    this.apiGateWayUrl + this.apiVersion + 'accounts/saving';
  modifySavingsAccountUrl: string =
    this.apiGateWayUrl + this.apiVersion + 'accounts/saving';
    changeStatusAccountUrl: string =
    this.apiGateWayUrl + this.apiVersion + 'accounts/saving';
  getSavingsAccountByCustomerIdUrl: string =
    this.apiGateWayUrl + this.apiVersion + 'accounts/saving/customer';

  getAllSavingsAccounts(
    page: number,
    size: number
  ): Observable<SavingsAccountDTO[]> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http
      .get<any>(this.getAllSavingsAccountsUrl, { params })
      .pipe(map((response) => response.data.savingAccounts));
  }
  getSearchSavingsAccounts(
    page:number,
    size:number,search: string): Observable<SavingsAccountDTO[]> {
    const params = new HttpParams().set('page', page).set('size', size).set('search',search);
    return this.http
      .get<any>(this.getSearchSavingsAccountsUrl,{ params })
      .pipe(map((response) => response.data.savingAccounts));
  }
  addSavingsAccount(file: File, body: any) {
    let formData: FormData = new FormData();
    if (file != undefined) {
      console.log(file, file.name);
      formData.append('image', file, file.name);
    }
    console.log(body);
    formData.append('savingsAccountRequestDto', JSON.stringify(body));
    console.log(formData);
    return this.http.post(this.addSavingsAccountUrl, formData);
  }
  
  changeStatus( data:any,status:string):boolean{
    let result=false;
    const body={
      "savingAccountId": data['savingsAccountId'],
  "isAllowOverDraft": null,
  "overDraftLimit": 0,
  "status": status
    }
    this.http.put(this.changeStatusAccountUrl, body).subscribe((data:any) => {
      if(data['status']=='Success')
      {
        result= true;
      }
      console.log('Data from API:', data);
    });
    return result;
  }
  modifySavingsAccount(body: any) {
    return this.http.put(this.modifySavingsAccountUrl, body);
  }
  getSavingsAccountsByCustomerId(
    customerId: number
  ): Observable<SavingsAccountModel[]> {
    return this.http
      .get<any>(this.getSavingsAccountByCustomerIdUrl + '/' + customerId)
      .pipe(map((response) => response.data));
  }
}
