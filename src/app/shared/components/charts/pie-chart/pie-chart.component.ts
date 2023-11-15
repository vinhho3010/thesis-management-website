import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() pieChartData!: ChartData<'pie'>;
  public pieChartType:ChartType = 'pie';
  public pieChartOptions: any = {
    responsive: true,
    legend: {
      position: 'top',
    },
  };
  public pieChartPlugins = [];

  constructor() {

  }


}
