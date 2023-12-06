import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  constructor(private router:Router){}
  checkPage(){
    if (this.router.url=='/login'){
    return false;
    }
    else{
      return true;
    }
  }
  logout(){
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }
}
