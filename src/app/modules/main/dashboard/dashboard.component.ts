import { ROLE_CODE } from './../../../common/constants';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label, MultiDataSet } from 'ng2-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // logged user
  loggedInUser;

  // line-chart 
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      align: 'start',
      position: 'bottom',
      labels: {
        padding: 40,
        fontSize: 16,
        boxWidth: 16,
        fontFamily: 'Montserrat'
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        }
      }],
      yAxes: [{
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        }
      }]
    },
    annotation: {
    },
  };
  public lineChartColors: Color[] = [
    { // Blue
      // backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: '#2AA6F0',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // Red
      // backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: '#F74148',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // Purple
      // backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: '#AB8DFF',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // Gold
      // backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: '#DFCC74',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  // doughnet
  public doughnutChartLabels: Label[];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartOptions: ChartOptions = {
    cutoutPercentage: 60,
    maintainAspectRatio: true,
    responsive: true,
    legend: {
      display: true,
      position: 'bottom',
      align: 'center',
      fullWidth: true,
      labels: {
        padding: 30,
        fontSize: 16,
        boxWidth: 18,
        fontFamily: 'Montserrat',
      }
    }
  };
  public doughnutChartType: ChartType = 'doughnut';
  public chartColors: any[] = [
    {
      backgroundColor: ["#C3E991", '#2AA6F0', "#DFCC74"]
    }];

  constructor() {

  }

  isfilter = false;
  ngOnInit(): void {
    this.loggedInUser = {
      role: sessionStorage.getItem('roleCode'),
      email: sessionStorage.getItem('email')
    }
    this.doughnutChartLabels = ['2014', '2015', '2016'];
    this.doughnutChartData = [
      [
        20, 40, 60
      ]
    ]
    this.lineChartData = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Pending Declarations', fill: false, },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Rejected Declarations', fill: false, },
      { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Pending Users', fill: false },
      ...(this.loggedInUser.role == ROLE_CODE.ADMIN ? [] : [{ data: [180, 480, 770, 90, 1000, 270, 400], label: 'Pending Risk Reports', fill: false }])
    ]
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  filter() {
    this.isfilter = !this.isfilter;
  }

}
