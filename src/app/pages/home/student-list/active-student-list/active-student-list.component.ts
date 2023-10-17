import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/Model/pagination';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
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
  displayedColumns: string[] = ['code', 'fullName', 'class', 'actions'];
  dataSource = new MatTableDataSource([]);
  classOfTeacher!: string;
  pagination: Pagination = {
    pageIndex: 0,
    pageSize: 5,
    length: 0
  }

  constructor(
    private authService: AuthService,
    private classService: ClassService,
    private toastService: ToastService,
    private excelHandleService: ExcelHandleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.classOfTeacher = this.authService.getClassId() as string;
    this.loadStudentList();
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
    this.router.navigate(['/students/thesis-detail'], navigationExtras);
  }

  loadStudentList(): void {
    this.classService.getStudentInClass(this.classOfTeacher).subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.pagination.length = res.length;
      },
      error: (err) => {
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
    const standardlizedData = data.map((item, index) => {
      return {
        index: index + 1,
        code: item?.code,
        fullName: item?.fullName,
        major: item?.major.name,
        class: item?.class,
      };
    });
    this.excelHandleService.exportToExcel(standardlizedData, 'DSSV', schema);
  }

    onPageChange(event: PageEvent) {
    this.pagination.pageIndex = event.pageIndex;
    this.pagination.pageSize = event.pageSize;
  }
}
