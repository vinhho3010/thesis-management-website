import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { schoolYear } from 'src/app/Model/enum/schoolYear';
import { CouncilService } from 'src/app/services/council.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { MajorService } from 'src/app/services/major.service';
import { ScoringComponent } from '../../dialog/scoring/scoring.component';
import { ThesisService } from 'src/app/services/thesis.service';
import { AuthService } from 'src/app/services/auth.service';
import { ExcelHandleService } from 'src/app/services/local/excel-handle.service';
import { DatePipe } from '@angular/common';
import { councilListHeader } from 'src/app/shared/utilities/excel-schema';

@Component({
  selector: 'app-assigned-detail',
  templateUrl: './assigned-detail.component.html',
  styleUrls: ['./assigned-detail.component.scss']
})
export class AssignedDetailComponent {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'position',
    'student',
    'teacher',
    'topic',
    'room',
    'date',
    'mark',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();

  schoolYear = schoolYear;
  councilId!: string;
  council: any;


  constructor(
    private dialog: MatDialog,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private loadingService: LoaderService,
    private councilService: CouncilService,
    private thesisService: ThesisService,
    private authService: AuthService,
    private excelHandleService: ExcelHandleService,
    private datePipe: DatePipe
  ) {
    this.councilId = this.route.snapshot.paramMap.get('id') as string;
  }

  ngOnInit(): void {
    this.loadCouncil();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  loadCouncil(): void {
    this.loadingService.setLoading(true);
    this.councilService.getCouncilById(this.councilId).subscribe({
      next: (res) => {
        this.loadingService.setLoading(false);
        this.council = res;
        this.dataSource.data = this.council.thesisList;
        this.hasMarkedByTeacher();
      },
      error: (err) => {
        this.loadingService.setLoading(false);
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  hasMarkedByTeacher() {
    const teacherId = this.authService.getUser()._id as string;
    this.council.thesisList.forEach((thesis: any) => {
      const isScored = thesis?.results.find((result: any) => result.teacher === teacherId);
      if(isScored) {
        thesis.markedByteacher = isScored;
      } else {
        thesis.markedByteacher = null;
      }
    });
  }

  onScoring(row: any): void {
    const config = {
      data: {
        thesis: row,
      }
    }
    const scoringDialog = this.dialog.open(ScoringComponent, config);

    scoringDialog.afterClosed().subscribe((res) => {
      if (res.result) {
        this.thesisService.scoringThesis(row._id, res.result).subscribe({
          next: ()=> {
            this.toastService.showSuccessToast('Chấm điểm thành công');
            this.loadCouncil();
          },
          error: (err) => {
            this.toastService.showErrorToast(err.error.message);
          }
        })

      }
    });
  }

  onExportData(data: any[]) {
    const schema = councilListHeader;
    const columnWidth = [10, 20, 25, 25, 50, 25, 20, 10, 25, 25, 25];
    const standardlizedData = data.map((item, index) => {
      return {
        index: index + 1,
        code: item?.student?.code,
        fullName: item?.student?.fullName,
        major: item?.student?.major.name,
        topic: `${item?.topic} \n (${item?.topicEng})`,
        teacher: item?.class?.teacher?.fullName,
        time: `${item?.protectInfo?.time} - ${this.datePipe.transform(new Date(item?.protectInfo?.date), 'dd/MM/yyyy')}`,
        room: item?.protectInfo?.room,
        president: this.council?.president?.fullName,
        member: this.council?.member?.fullName,
        secretary: this.council?.secretary?.fullName,
      };
    });
    console.log(standardlizedData, data);

    this.excelHandleService.exportToExcel(standardlizedData, 'HoiDong', schema, columnWidth);
  }

}
