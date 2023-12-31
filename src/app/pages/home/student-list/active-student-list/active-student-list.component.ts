import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ThesisStatus } from 'src/app/Model/enum/thesis-status';
import { Pagination } from 'src/app/Model/pagination';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ExcelHandleService } from 'src/app/services/local/excel-handle.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { studentListHeader } from 'src/app/shared/utilities/excel-schema';

@Component({
  selector: 'app-active-student-list',
  templateUrl: './active-student-list.component.html',
  styleUrls: ['./active-student-list.component.scss'],
})
export class ActiveStudentListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['code', 'fullName', 'class', 'topic','status' ,  'actions'];
  dataSource = new MatTableDataSource([]);
  classOfTeacher!: string;
  searchCode = new FormControl('');
  THESIS_STATUS = ThesisStatus;
  pagination: Pagination = {
    page: 0,
    limit: 5,
    length: 0
  }
  paramsSubscription: any;

  constructor(
    private authService: AuthService,
    private classService: ClassService,
    private toastService: ToastService,
    private excelHandleService: ExcelHandleService,
    private router: Router,
    private loadingService: LoaderService,
    private route: ActivatedRoute
  ) {
    this.classOfTeacher = this.route.snapshot.paramMap.get('id') as string;
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      let newId = params.get('id');
      if (newId !== this.classOfTeacher) {
        this.classOfTeacher = newId as string;
        this.loadStudentList();
      }
    });
  }

  ngOnInit(): void {
    this.loadStudentList();
    this.onListenSearchCode();
  }

  onListenSearchCode(): void {
    this.searchCode.valueChanges.subscribe((value) => {
      if(value) {
        this.dataSource.filter = value.trim().toLowerCase();
      } else {
        this.dataSource.filter = '';
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onEditRow(row: any): void {
    const navigationExtras: NavigationExtras = {
      state: {
        selectedStudent: row,
      },
    };
    this.router.navigate([`students/thesis-detail/${this.classOfTeacher}`], navigationExtras);
  }

  loadStudentList(): void {
    this.loadingService.setLoading(true);
    this.classService.getStudentInClass(this.classOfTeacher).subscribe({
      next: (res) => {
        this.loadingService.setLoading(false);
        this.dataSource.data = res;
        this.pagination.length = res.length;
      },
      error: (err) => {
        this.loadingService.setLoading(false);
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  onRemoveStudent(student: any) {
    this.toastService.confirmHandle(
      'Bạn có chắc chắn muốn xóa sinh viên khỏi nhóm?',
      this.removeStudentHandler.bind(this, student._id)
    );
  }

  removeStudentHandler(studentId: string): void {
    this.classService
      .removeStudentFromClass(this.classOfTeacher, studentId)
      .subscribe({
        next: () => {
          this.toastService.showSuccessToast(
            'Xóa sinh viên khỏi nhóm thành công'
          );
          this.loadStudentList();
        },
        error: (err) => {
          this.toastService.showErrorToast(err.error.message);
        },
      });
  }

  onExportData(data: any[]) {
    const schema = studentListHeader;
    const columnWidth = [10, 20, 25, 25, 20, 40, 40];
    const standardlizedData = data.map((item, index) => {
      return {
        index: index + 1,
        code: item?.code,
        fullName: item?.fullName,
        major: item?.major.name,
        class: item?.class,
        topic: item?.thesis?.topic,
        topicEng: item?.thesis?.topicEng,
      };
    });
    this.excelHandleService.exportToExcel(standardlizedData, 'DSSV', schema, columnWidth);
  }

    onPageChange(event: PageEvent) {
    this.pagination.page = event.pageIndex;
    this.pagination.limit = event.pageSize;
  }
}
