import { Component } from '@angular/core';
import { InsightsService } from 'src/app/services/insights.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-total-customer',
  templateUrl: './total-customer.component.html',
  styleUrls: ['./total-customer.component.css'],
})
export class TotalCustomerComponent {
  cities: string[] = ['Bangalore', 'Chennai', 'Pune', 'Hyderabad'];
  cityChosen: string = this.cities[0];
  currentValue!: number;
  constructor(
    private insightsService: InsightsService,
    private snackBarService: SnackbarService
  ) {}

  get fillPercentage(): number {
    return this.currentValue;
  }

  ngOnInit() {
    this.getTotalCustomerPercentageByCity(this.cities[0]);
  }

  getBackground(count: number) {
    const percentage = count;
    const gradient = `conic-gradient(
      #6672FA ${percentage}%,
      transparent ${percentage}% 100%
    )`;
    return gradient;
  }

  getTotalCustomerPercentageByCity(city: string) {
    this.insightsService
      .getTotalCustomerPercentageByCity(city.toLowerCase())
      .subscribe(
        (res) => {
          console.log(res);
          this.currentValue = parseInt(res, 10);
          this.cityChosen = city;
        },
        (error) => {
          console.log(error);
          this.snackBarService.showSnackBar(
            'Unable to fetch total customer percentage by city values'
          );
        }
      );
  }

  getGraph(city: string) {
    this.getTotalCustomerPercentageByCity(city);
  }
}
