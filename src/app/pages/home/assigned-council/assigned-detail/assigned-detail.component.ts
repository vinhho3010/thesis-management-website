import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { schoolYear } from 'src/app/Model/enum/schoolYear';
import { AddCouncilComponent } from 'src/app/pages/ministry/dialog/add-council/add-council.component';
import { ClassService } from 'src/app/services/class.service';
import { CouncilService } from 'src/app/services/council.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { MajorService } from 'src/app/services/major.service';
import { ScoringComponent } from '../../dialog/scoring/scoring.component';
import { ThesisService } from 'src/app/services/thesis.service';
import { AuthService } from 'src/app/services/auth.service';

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

  majorList: any[] = [];
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
    private authService: AuthService
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

}
