/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
} from 'ng-apexcharts';
import { routes } from 'src/app/shared/service/routes/routes';
export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
  colors: ApexXAxis | any;
};

@Component({
    selector: 'app-instructor-earnings',
    templateUrl: './instructor-earnings.component.html',
    styleUrls: ['./instructor-earnings.component.scss'],
    standalone: false
})
export class InstructorEarningsComponent implements OnInit {
  public routes = routes;
  @ViewChild('chart') chart!: ChartComponent;
  public earningChart: Partial<ChartOptions> | any;

  ngOnInit(): void {
    this.earningChart = {
        series: [{
        name: "Earnings",
        data: [25, 40, 30, 55, 25, 35, 25,50,20,40,20,50]
      }],
        chart: {
        height: 273,
        type: 'area',
        zoom: {
        enabled: false
        }
      },
      colors: ['#FF4667'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: '',
        align: 'left'
      },
      // grid: {
      //   row: {
      //     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      //     opacity: 0.5
      //   },
      // },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yaxis: {
        min: 10,
        max: 60,
        tickAmount: 5,
          labels: {
          formatter: (val:any) => {
            return val / 1 + 'K'
          }
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        }
      
    };
  }
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  constructor(){
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
}
