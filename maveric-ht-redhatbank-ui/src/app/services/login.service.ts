import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login-model.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient) {}

  apiGateWayUrl = 'https://sso-keycloak-senthilkn-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com';
  loginUrl :string = this.apiGateWayUrl+'/api/v1/login';

  login(data: LoginModel){
    return this.http.post(this.loginUrl, data)
  }

}
