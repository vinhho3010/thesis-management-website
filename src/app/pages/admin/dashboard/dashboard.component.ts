import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { schoolYear } from 'src/app/Model/enum/schoolYear';
import { ToastService } from 'src/app/services/local/toast.service';
import { StatisticService } from 'src/app/services/statistic.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  pieChartData: any;
  columnChartData: any;
  lineChartData: any;
  accountCount: any;
  schoolYear = schoolYear;
  allThesisCount: any;
  currentThesisCount: any;
  filterOptionForm = new FormGroup({
    schoolYear: new FormControl(environment.currentSchoolYear),
    semester: new FormControl(environment.currentSemester),
  });

  constructor(private statisticService: StatisticService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.countAccount();
    this.countThesis();

    //chart loadData
    this.loadAccountPerRole();
    this.loadThesisPerMajor();
    this.countThesisBySchoolYear();

    this.onListenFilterFormChange();
  }

  countAccount() {
    this.statisticService.countAccount().subscribe((res) => {
      this.accountCount = res;
    });
  }

  loadAccountPerRole() {
    this.statisticService.accountPerRole().subscribe((res) => {
      this.fillPieChartData(res);
    });
  }

  loadThesisPerMajor() {
    this.statisticService.countThesisByMajor(
        this.filterOptionForm.value.semester as string,
        this.filterOptionForm.value.schoolYear as string
      )
      .subscribe({
        next: (res) => {
          this.fillColumnChartData(res);
        },
        error: (err) => {
          this.toastService.showErrorToast('Không tải được dữ liệu');
        },
      });
  }

  fillPieChartData(data: any) {
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

  fillColumnChartData(data: any) {
    this.columnChartData = {
      labels: [],
      datasets: [
        { data: [], label: 'Số lượng luận văn' },
      ],
    };
    for(let item of data) {
      this.columnChartData.labels.push(item.major);
      this.columnChartData.datasets[0].data.push(item.count);
    }
  }

  fillLineChartData(data: any) {
    this.lineChartData = {
      labels: [],
      datasets: [
        { data: [], label: 'Số lượng luận văn' },
      ],
    };
    for(let item of data) {
      this.lineChartData.labels.push(item.schoolYear);
      this.lineChartData.datasets[0].data.push(item.count);
    }
  }

  countThesisBySchoolYear() {
    const schoolYear = Object.values(this.schoolYear);
    this.statisticService.countThesisBySchoolyear(schoolYear).subscribe((res) => {
      this.fillLineChartData(res);
    });
  }

  countThesis() {
    const allThesis = this.statisticService.countThesis();
    const currentThesis = this.statisticService.countThesis(environment.currentSemester, environment.currentSchoolYear);
    forkJoin([
      allThesis, currentThesis
    ]).subscribe((res) => {
      this.allThesisCount = res[0];
      this.currentThesisCount = res[1];
    })
  }

  onListenFilterFormChange() {
    this.filterOptionForm.valueChanges.subscribe((res) => {
      this.loadThesisPerMajor();
    });
  }
}
