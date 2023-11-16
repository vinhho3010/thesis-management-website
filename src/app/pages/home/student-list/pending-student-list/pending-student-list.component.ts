import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { RegisterTopicComponent } from '../../register-topic/register-topic.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterTopicDialogComponent } from '../../dialog/register-topic/register-topic.component';
import { LoaderService } from 'src/app/services/loader.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-pending-student-list',
  templateUrl: './pending-student-list.component.html',
  styleUrls: ['./pending-student-list.component.scss'],
})
export class PendingStudentListComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @Output() studentPendingCount = new EventEmitter<number>();
  displayedColumns: string[] = [
    'studentCode',
    'fullName',
    'class',
    'topic',
    'actions',
  ];
  dataSource = new MatTableDataSource([]);
  classId: string
  paramsSubscription: any;

  constructor(
    private classService: ClassService,
    private authService: AuthService,
    private toastService: ToastService,
    private dialog: MatDialog,
    private loadingService: LoaderService,
    private route: ActivatedRoute,
    private notificationsService: NotificationsService
  ) {
    this.classId = this.route.snapshot.paramMap.get('id') as string;
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      let newId = params.get('id');
      if (newId !== this.classId) {
        this.classId = newId as string;
        this.loadPendingStudentList();
      }
    });
  }

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
        this.notificationsService.newNotification({
          from: this.authService.getUser()._id,
          to: row.student._id,
          content: `Giảng viên ${this.authService.getUser().fullName} đã chấp nhận yêu cầu đăng ký đề tài của bạn`,
          title: 'Đề tài đã được chấp nhận',
          linkAction: '/class'
        });
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
        this.notificationsService.newNotification({
          from: this.authService.getUser()._id,
          to: row.student._id,
          content: `Giảng viên ${this.authService.getUser().fullName} đã từ chối yêu cầu đăng ký đề tài của bạn`,
          title: 'Đề tài đã bị từ chối',
          linkAction: '/register-topic'
        });
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
    this.classService.getPendingStudents(this.classId).subscribe({
        next: (res) => {
          this.loadingService.setLoading(false);
          this.dataSource.data = this.standardizeData(res);
          this.studentPendingCount.emit(res.length);
        },
        error: (err) => {
          this.loadingService.setLoading(false);
          this.toastService.showErrorToast(err.error.message);
        },
      });
  }
}
