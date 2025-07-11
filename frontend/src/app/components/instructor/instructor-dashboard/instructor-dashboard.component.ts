/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import {ChartComponent,ApexAxisChartSeries,ApexChart,ApexXAxis,ApexDataLabels,ApexTooltip,ApexStroke,ApexPlotOptions,ApexLegend,ApexYAxis,ApexFill,ApexGrid,ApexMarkers} from "ng-apexcharts";
import { bestSellingCourses } from 'src/app/models/model';
import { DataService } from 'src/app/shared/service/data/data.service';
import { routes } from 'src/app/shared/service/routes/routes';
export type ChartOptions = {
   
  series: ApexAxisChartSeries |any;
  chart: ApexChart |any;
  xaxis: ApexXAxis |any;
  yaxis: ApexYAxis |any;
  stroke: ApexStroke |any;
  tooltip: ApexTooltip |any;
  dataLabels: ApexDataLabels |any;
  plotOptions: ApexPlotOptions |any;
  fill: ApexFill |any;
  legend: ApexLegend |any;
  grid: ApexGrid |any;
  markers: ApexMarkers |any;
};

@Component({
    selector: 'app-instructor-dashboard',
    templateUrl: './instructor-dashboard.component.html',
    styleUrls: ['./instructor-dashboard.component.scss'],
    standalone: false
})
export class InstructorDashboardComponent implements OnInit {
  public routes = routes;
  @ViewChild("chart") chart!: ChartComponent;
  public Earningchart!: Partial<ChartOptions>;
  public ColumnCharts!: Partial<ChartOptions>;
  public bestSellingCourses : bestSellingCourses []= [];



  ngOnInit(): void {
    this.Earningchart = {
      chart: {
			height: 290,
			type: 'bar',
			stacked: true,
			toolbar: {
			  show: false,
			}
		  },
		  plotOptions: {
			bar: {
			  borderRadius: 5,
			  horizontal: false,
			  endingShape: 'rounded'
			},
		  },
		  series: [{
			name: 'Earnings',
			data: [80, 100, 70, 110, 80, 90, 85, 85, 110, 30, 100, 90]
		  }],
		  xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
			labels: {
			  style: {
				colors: '#4D4D4D', 
				fontSize: '13px',
			  }
			}
		  },
		  yaxis: {
			labels: {
			  offsetX: -15,
			  style: {
				colors: '#4D4D4D', 
				fontSize: '13px',
			  }
			}
		  },
		  grid: {
			borderColor: '#4D4D4D',
			strokeDashArray: 5
		  },
		  legend: {
			show: false
		  },
		  dataLabels: {
			enabled: false // Disable data labels
		  },
		  fill: {
			type: 'gradient',
			gradient: {
			  shade: 'dark',
			  type: 'linear',
			  shadeIntensity: 0.35,
			  gradientToColors: ['#392C7D'], // Second gradient color
			  inverseColors: false,
			  opacityFrom: 1,
			  opacityTo: 1,
			  stops: [0, 100],
			  angle: 90 // This sets the gradient direction from top to bottom
			}
		  },
    };
    this.ColumnCharts = {
      series: [
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
          color: "#1D9CFD"
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "20%",
          borderRadius: 7
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
      },
      fill: {
        opacity: 1
      },
      grid: {
        show: false,
      },
    };
  }
  public isClassAdded: boolean[] = [false];

  toggleClass(index: number) {
    this.isClassAdded[index] = !this.isClassAdded[index];
  }

}
