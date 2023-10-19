import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { RegisterTopicComponent } from '../../register-topic/register-topic.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterTopicDialogComponent } from '../../dialog/register-topic/register-topic.component';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-pending-student-list',
  templateUrl: './pending-student-list.component.html',
  styleUrls: ['./pending-student-list.component.scss'],
})
export class PendingStudentListComponent {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'studentCode',
    'fullName',
    'class',
    'topic',
    'actions',
  ];
  dataSource = new MatTableDataSource([]);

  constructor(
    private classService: ClassService,
    private authService: AuthService,
    private toastService: ToastService,
    private dialog: MatDialog,
    private loadingService: LoaderService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onApprovePending(row: any): void {
    this.toastService.confirmHandle(
      'Bạn có chắc chắn muốn chấp nhận sinh viên này?',
      this.approveHandler.bind(this, row)
    );
  }

  approveHandler(row: any): void {
    this.classService.approvePendingItem(row._id).subscribe({
      next: () => {
        this.loadPendingStudentList();
        this.toastService.showSuccessToast('Chấp nhận sinh viên thành công');
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }
  onRejectPending(row: any) {
    this.toastService.confirmHandle(
      'Bạn muốn từ chối sinh viên này?',
      this.rejectHandler.bind(this, row)
    );
  }

  rejectHandler(row: any): void {
    this.classService.rejectPendingItem(row._id).subscribe({
      next: () => {
        this.loadPendingStudentList();
        this.toastService.showSuccessToast('Đã từ chối sinh viên');
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  ngOnInit(): void {
    this.loadPendingStudentList();
  }

  standardizeData(data: any) {
    return data.map((item: any) => {
      return {
        ...item,
        studentCode: item?.student?.code,
        fullName: item?.student?.fullName,
        class: item?.student?.class,
        topic: item?.topic,
      };
    });
  }

  onViewDetail(row: any): void {
    const dialogConfig = {
      data: {
        ...row,
        isTeacherViewDetail: true,
      },
    };
    this.dialog.open(RegisterTopicDialogComponent, dialogConfig);
  }

  loadPendingStudentList() {
    this.loadingService.setLoading(true);
    this.classService.getPendingStudents(this.authService.getClassId() as string).subscribe({
        next: (res) => {
          this.loadingService.setLoading(false);
          this.dataSource.data = this.standardizeData(res);
        },
        error: (err) => {
          this.loadingService.setLoading(false);
          this.toastService.showErrorToast(err.error.message);
        },
      });
  }
}
