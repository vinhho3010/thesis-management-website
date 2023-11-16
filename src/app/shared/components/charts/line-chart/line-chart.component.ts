import { Component, Input, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, ChartEvent, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input({required: true}) lineChartData!: ChartData<'line'>;
  constructor() {

  }

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
        min: 0,
      },
      x: {
        position: 'bottom',
      },

    },

    plugins: {
      legend: {
        display: true,
      },
    },
  };

  public lineChartType: ChartType = 'line';


}
