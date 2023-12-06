import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wrong-page-component',
  templateUrl: './wrong-page-component.component.html',
  styleUrls: ['./wrong-page-component.component.css'],
})
export class WrongPageComponentComponent {
  constructor(private zone: NgZone, private router: Router) {}

  navigateToHome() {
    setTimeout(() => {
      this.zone.run(() => {
        console.log('Timeout completed!');
        this.router.navigateByUrl('/home');
      });
    }, 1000);
  }
}
