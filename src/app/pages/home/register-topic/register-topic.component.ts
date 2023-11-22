import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { mergeMap } from 'rxjs';
import { ToastService } from 'src/app/services/local/toast.service';
import { MajorService } from 'src/app/services/major.service';
import { ManageUserService } from 'src/app/services/manage-user.service';
import { RegisterTopicDialogComponent } from '../dialog/register-topic/register-topic.component';
import { AuthService } from 'src/app/services/auth.service';
import { registerToClassData } from 'src/app/Model/register-topic';
import { ClassService } from 'src/app/services/class.service';
import { RegisteredTopic } from 'src/app/Model/registerTopic/registerTopic';
import { PendingStatus } from 'src/app/Model/enum/pendingStatus';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-register-topic',
  templateUrl: './register-topic.component.html',
  styleUrls: ['./register-topic.component.scss']
})
export class RegisterTopicComponent implements OnInit {

  majorList: any[] = [];
  teacherList: any[] = [];
  pendingRequest: any[] = [];
  approvedRequest: any[] = [];
  rejectedRequest: any[] = [];
  hasApprovedRequest= true;
  selectedMajor: any;
  selectedTeacher: any;

  constructor(
    private majorService: MajorService,
    private manageUserService: ManageUserService,
    private toastService: ToastService,
    private matDialog: MatDialog,
    private authService: AuthService,
    private classService: ClassService,
    private loadingService: LoaderService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.loadMajorList();
    this.loadRegisterd();

  }

  loadMajorList(){
    this.majorService.getAllmajor().subscribe({
      next: (res) => {
        this.majorList = res;
        this.selectDefaultMajor();
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    });

  }
  loadTeacherList(){
    this.manageUserService.getTeacherByMajorHasClass(this.selectedMajor._id).subscribe({
      next: (res) => {
        this.teacherList = res;
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }

  selectDefaultMajor(){
    if(this.authService.getUser().major){
      this.selectedMajor = this.majorList.find((value) => value._id === this.authService.getUser().major?._id);
      this.loadTeacherList();
    }
  }

  loadRegisterd() {
    this.loadingService.setLoading(true);
    this.classService.getPendingRequestOfStudent(this.authService.getUser()._id).subscribe({
      next: (res: RegisteredTopic[]) => {
        this.loadingService.setLoading(false);
          if(res){
            this.pendingRequest = res.filter((value) => value.status === PendingStatus.PENDING);
            this.approvedRequest = res.filter((value) => value.status === PendingStatus.APPROVED);
            this.rejectedRequest = res.filter((value) => value.status === PendingStatus.REJECTED);
            if(this.approvedRequest.length > 0){
              this.hasApprovedRequest = true;
            } else {
              this.hasApprovedRequest = false;
            }
          }
      },
      error: (err) => {
        this.loadingService.setLoading(false);
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }

  registeredWithTeacher(teacher: any){
    const request = [...this.pendingRequest, ...this.rejectedRequest]
    const instructClassId = teacher.instructClass.map((value: any) => value?._id);
    return request.find((value) => {
      return instructClassId.includes(value?.class?._id);
    });
  }

  selectMajor(major: any){
    this.selectedMajor = major;
    this.loadTeacherList();
  }

  cancelRegister(pending: any) {
    this.toastService.confirmDeleteMessage('Bạn có chắc chắn muốn huỷ?',this.cancelRegisterHandler.bind(this, pending));
  }

  cancelRegisterHandler(pending: any){
    this.classService.cancelRegister(pending._id).subscribe({
      next: () => {
        this.toastService.showSuccessToast('Hủy đăng ký thành công');
        this.loadRegisterd();
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }

  onRegisterTopic(teacher: any){
    if(teacher.major !== this.authService.getUser()?.major?._id){
      this.toastService.infoToast('<b>Giảng viên không thuộc ngành của bạn</b>. <br> Bạn chỉ có thể đăng ký với giảng viên cùng chuyên ngành hoặc liên hệ riêng với giảng viên để được đăng ký');
      return;
    }

   const registerTopic =  this.matDialog.open(RegisterTopicDialogComponent, {
      data: {
        teacher: teacher,
        ...this.authService.getUser()
      }
    });
    registerTopic.afterClosed().subscribe(res => {
      if(res){
        const result = res.result;
        const submitData: registerToClassData = {
          studentId: this.authService.getUser()._id,
          classId: teacher?.instructClass[0]?._id,
          type: result?.type,
          topic: result?.topic,
          topicEng: result?.topicEng,
          description: result.description,
          semester: result.semester,
          schoolYear: result.schoolYear
        }
        this.classService.registerToClass(submitData).subscribe({
          next: () => {
            this.toastService.showSuccessToast('Đăng ký thành công');
            this.notificationsService.newNotification({
              from: this.authService.getUser()._id,
              to: teacher._id,
              title: 'Đăng ký đề tài',
              content: `Sinh viên ${this.authService.getUser().fullName} đã đăng ký với bạn`,
              linkAction: `students/${teacher?.instructClass[0]?._id}`,
            })
            this.loadRegisterd();
          },
          error: (err) => {
            this.toastService.showErrorToast(err.error.message);
          }
        });
      }
    });
  }

  onEditTopic(pending: any){
    const registerTopic =  this.matDialog.open(RegisterTopicDialogComponent, {
      data: {
        teacher: pending.class.teacher,
        ...this.authService.getUser(),
        pending: pending
      }
    });

    registerTopic.afterClosed().subscribe(res => {
      if(res){
        const result = res.result;
        const submitData: registerToClassData = {
          studentId: this.authService.getUser()._id,
          classId: pending.class._id,
          type: result?.type,
          topic: result?.topic,
          topicEng: result?.topicEng,
          description: result.description,
          semester: result.semester,
          schoolYear: result.schoolYear
        }

        this.classService.updateRegister(pending._id, submitData).subscribe({
          next: () => {
            this.toastService.showSuccessToast('Cập nhật thành công');
            this.loadRegisterd();
          },
          error: (err) => {
            this.toastService.showErrorToast(err.error.message);
          }
        });
      }
    });
  }
}
