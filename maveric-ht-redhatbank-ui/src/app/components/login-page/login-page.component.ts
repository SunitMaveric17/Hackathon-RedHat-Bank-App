import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginForm: FormGroup ;
    constructor(private formBuilder:FormBuilder,
       private router:Router, 
       private loginService:LoginService){
      this.loginForm = this.formBuilder.group({
        userName: ['', [Validators.required]],
        password: ['', [Validators.required]],
      });
    }
    onSubmit(){
      console.log("login submit clicked")
      this.router.navigateByUrl('/home');
    }
}
