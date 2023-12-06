import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsightsService {
  constructor(private http: HttpClient) {}
  apiGateWayUrl =
    'https://insights-service-senthilkn-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com';
  apiVersion = '';
  getCustomerCountUrl: string =
    this.apiGateWayUrl +
    this.apiVersion +
    '/insights/GetCustomerCountByMonth?year=';
  getLoanProductsUrl: string =
    this.apiGateWayUrl + this.apiVersion + '/insights/count-by-month?year=';
  getTotalCustomerPercentageByCityUrl: string =
    this.apiGateWayUrl + this.apiVersion + '/insights/percentage?city=';

  getCustomerCount(year: number): Observable<any> {
    return this.http
      .get<any>(this.getCustomerCountUrl + year)
      .pipe(map((response) => response.data));
  }
  getLoanProducts(year: number): Observable<any> {
    return this.http.get<any>(this.getLoanProductsUrl + year).pipe(
      map((response) => {
        return response;
      })
    );
  }
  getTotalCustomerPercentageByCity(city: string): Observable<any> {
    return this.http
      .get<any>(this.getTotalCustomerPercentageByCityUrl + city)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
