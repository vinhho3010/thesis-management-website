import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { schoolYear } from 'src/app/Model/enum/schoolYear';
import { StatisticService } from 'src/app/services/statistic.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  pieChartData: any;
  accountCount: any;
  schoolYear = schoolYear;
  filterOptionForm = new FormGroup({
    schoolYear: new FormControl(environment.currentSchoolYear),
    semester: new FormControl(environment.currentSemester),
  });

  constructor(private statisticService: StatisticService) {}

  ngOnInit(): void {
    this.loadAccountPerRole();
    this.countAccount();
  }

  countAccount() {
    this.statisticService.countAccount().subscribe((res) => {
      this.accountCount = res;
    });
  }

  loadAccountPerRole() {
    this.statisticService.accountPerRole().subscribe((res) => {
      this.fillChartData(res);
    });
  }

  fillChartData(data: any) {
    const pieChartLabels = ['Giảng viên', 'Sinh viên', 'Giáo vụ'];
    const chartData = [
      data.teacher,
      data.student,
      data.ministry,
    ];
    this.pieChartData = {
        labels: pieChartLabels,
        datasets: [
          {
            data: [...chartData],
            backgroundColor: ['#8FA6D0', '#F7C9C9', '#E5E5E5'],
            hoverBackgroundColor: ['#8FA6D0', '#F7C9C9', '#E5E5E5'],
          },
        ],
      };
  }
}
