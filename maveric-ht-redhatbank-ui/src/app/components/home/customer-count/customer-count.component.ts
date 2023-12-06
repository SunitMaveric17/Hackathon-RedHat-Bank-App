import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ChartDataset, ChartOptions } from 'chart.js';
import { InsightsService } from 'src/app/services/insights.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-customer-count',
  templateUrl: './customer-count.component.html',
  styleUrls: ['./customer-count.component.css'],
})
export class CustomerCountComponent {
  data: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  totalCustomerCount: number = this.getSumOfArray(this.data);
  yearAvailable: number[] = this.createNumberArray(2019, 2023);
  currentYearChosen: number = this.yearAvailable[this.yearAvailable.length - 1];
  chartDataAvailable: boolean = false;
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          font: { size: 14 }, // Increase the font size of y-axis labels
        },
        grid: {
          display: false, // Hide y-axis grid lines
        },
      },
      x: {
        type: 'category',
        display: false,
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
    },
  };

  public lineChartLabels: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  public lineChartLegend = false;
  public lineChartData: ChartDataset[] = [
    {
      data: this.data,
      label: 'Customer Count',
      backgroundColor: 'rgba(255, 165, 0, 0.6)', // Orange color with 60% opacity
      borderColor: 'rgba(255, 165, 0, 1)', // Border color (optional)
      barThickness: 4,
      borderRadius: 5,
      pointRadius: 5, // Size of data points on the line chart (optional)
      fill: false, // Disable fill under the line (optional)
    },
  ];

  constructor(
    private insightsService: InsightsService,
    private cdr: ChangeDetectorRef,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit() {
    this.updateChartData(this.yearAvailable[this.yearAvailable.length - 1]);
  }

  createNumberArray(x: number, y: number): number[] {
    return Array.from({ length: y - x + 1 }, (_, index) => index + x);
  }

  getCustomerCountByYear(year: number) {
    this.insightsService.getCustomerCount(year).subscribe(
      (res) => {
        console.log(res);
        this.data = Object.values(res);
        this.totalCustomerCount = this.getSumOfArray(Object.values(res));
        this.lineChartData[0].data = this.data;
        this.chartDataAvailable = true;
        this.cdr.detectChanges();
      },
      (error) => {
        console.log(error);
        this.snackBarService.showSnackBar(
          'Customer count fetch is not available for this year'
        );
        this.totalCustomerCount = 0;
        this.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.chartDataAvailable = false;
        this.cdr.detectChanges();
      }
    );
  }
  updateChartData(yearChosen: number) {
    this.getCustomerCountByYear(yearChosen);
  }
  customerCountYearChoose(yearChosen: number) {
    this.currentYearChosen = yearChosen;
    this.updateChartData(this.currentYearChosen);
  }
  getSumOfArray(array: number[]) {
    return array.reduce((partialSum, a) => partialSum + a, 0);
  }
}
