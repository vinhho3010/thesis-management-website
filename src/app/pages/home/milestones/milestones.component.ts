import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { AddMilestoneComponent } from '../dialog/add-milestone/add-milestone.component';
import { MilestoneService } from 'src/app/services/milestone.service';
import { LoaderService } from 'src/app/services/loader.service';
import { schoolYear } from 'src/app/Model/enum/schoolYear';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class MilestonesComponent implements OnInit {
  milestonesList: any[] = [];
  schoolYear = schoolYear;
  instructingClasses = this.authService.getUser().instructClass;

  filterOptionForm = new FormGroup({
    schoolYear: new FormControl(environment.currentSchoolYear),
    semester: new FormControl(environment.currentSemester),
  })

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private dialog: MatDialog,
    private milestoneService: MilestoneService,
    private loadingService: LoaderService,
    private notificationService: NotificationsService,
    private classService: ClassService,
  ) {}

  ngOnInit(): void {
    this.loadMilestones();
    this.onListenFilterFormChange();
  }

  loadMilestones() {
    this.loadingService.setLoading(true);

    const classInfo = this.instructingClasses.find((classItem: any) => {
      return classItem.schoolYear == this.filterOptionForm.value.schoolYear && classItem.semester == this.filterOptionForm.value.semester
    });
    if(classInfo) {
      this.milestoneService.getClassMilestones(classInfo._id as string).subscribe({
        next: (res) => {
          this.loadingService.setLoading(false);
          this.milestonesList = res;
        },
        error: (err) => {
          this.loadingService.setLoading(false);
          this.toastService.showErrorToast('Không tải được danh sách');
        }
      })
    } else {
      this.loadingService.setLoading(false);
      this.milestonesList = [];
      //this.toastService.showErrorToast('Bạn không có nhóm hướng dẫn trong học kỳ này');
    }
  }

  createMilestone(milestone: any) {
    const classInfo = this.instructingClasses.find((classItem: any) => {
      return classItem.schoolYear == this.filterOptionForm.value.schoolYear && classItem.semester == this.filterOptionForm.value.semester
    });
    if(classInfo) {
      this.milestoneService.createMilestone(classInfo._id as string, milestone).subscribe({
        next: (res) => {
          this.toastService.showSuccessToast('Tạo thành công');
          this.loadMilestones();
          this.sendCreateNotice(classInfo);
        },
        error: (err) => {
          this.toastService.showErrorToast('Không tạo được');
        }
      })
    }
    else {
      this.toastService.showErrorToast('Bạn không có nhóm hướng dẫn trong học kỳ này');
    }
  }

  sendNotificationToStudent(classInfo: any, title?: string, content?: string) {
    let studentIds = [];

    this.classService.getStudentInClass(classInfo?._id as string).subscribe({
      next: (res) => {
        studentIds = res.map((student: { _id: any; }) => student._id);
        studentIds.forEach((studentId: any) => {
          this.notificationService.newNotification({
            from: this.authService.getUser()._id,
            to: studentId,
            content: content,
            title: title,
            linkAction: '/process'
          });
        });
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  updateMilestone(milestone: any) {
    this.milestoneService.updateMilestone(milestone?._id, milestone).subscribe({
      next: (res) => {
        this.toastService.showSuccessToast('Cập nhật thành công');
        this.loadMilestones();
        this,this.sendUpdateNotice(milestone?.class);
      },
      error: (err) => {
        this.toastService.showErrorToast('Không cập nhật được');
      }
    })
  }

  sendCreateNotice(classInfo: any) {
    const content = `Giảng viên ${this.authService.getUser().fullName} vừa thêm mới một mốc thời gian`;
    const title = 'Mốc thời gian mới';
    this.sendNotificationToStudent(classInfo, title, content);
  }

  sendUpdateNotice(classInfo: any) {
    const content = `Giảng viên ${this.authService.getUser().fullName} vừa cập nhật một mốc thời gian`;
    const title = 'Mốc thời gian được cập nhật';
    this.sendNotificationToStudent(classInfo, title, content);
  }

  onAddMilestone() {
    const addMilestoneDialog = this.dialog.open(AddMilestoneComponent, {});
    addMilestoneDialog.afterClosed().subscribe((res) => {
      if(res?.result) {
        this.createMilestone(res.result);
      }
    })
  }

  onEditMilestone(milestone: any) {
    const addMilestoneDialog = this.dialog.open(AddMilestoneComponent, {
      data: {
        milestone: milestone,
      }
    });
    addMilestoneDialog.afterClosed().subscribe((res) => {
      if(res?.updateResult) {
        this.updateMilestone(res.updateResult);
      }
    })
  }

  onDeleteMilestone(milestone: any) {
    this.toastService.confirmDeleteMessage('Bạn có chắc chắn muốn xóa?',
    this.deleteMilestoneHandler.bind(this, milestone)
    );
  }

  deleteMilestoneHandler(milestone: any) {
    this.milestoneService.deleteMilestone(milestone._id).subscribe({
      next: (res) => {
        this.toastService.showSuccessToast('Xóa thành công');
        this.loadMilestones();
      },
      error: (err) => {
        this.toastService.showErrorToast('Không xóa được');
      }
    })
  }

  onListenFilterFormChange() {
    //if schoolyear or semester change, reload council list with debounceTime 500ms
    this.filterOptionForm.valueChanges.pipe(debounceTime(500)).subscribe({
      next: () => {
        this.loadMilestones();
      }
    })

  }
}
