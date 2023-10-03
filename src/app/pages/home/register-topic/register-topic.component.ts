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

@Component({
  selector: 'app-register-topic',
  templateUrl: './register-topic.component.html',
  styleUrls: ['./register-topic.component.scss']
})
export class RegisterTopicComponent implements OnInit {

  majorList: any[] = [];
  teacherList: any[] = [];
  selectedMajor: any;
  selectedTeacher: any;

  constructor(
    private majorService: MajorService,
    private manageUserService: ManageUserService,
    private toastService: ToastService,
    private matDialog: MatDialog,
    private authService: AuthService,
    private classService: ClassService
  ) { }

  ngOnInit(): void {
    this.loadMajorList();
  }

  loadMajorList(){
    this.majorService.getAllmajor().subscribe({
      next: (res) => {
        this.majorList = res;
        this.selectedMajor = this.majorList[0];
        this.loadTeacherList();
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

  selectMajor(major: any){
    this.selectedMajor = major;
    this.loadTeacherList();
  }


  onRegisterTopic(teacher: any){
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
          classId: teacher?.instructClass,
          type: result?.type,
          topic: result?.topic,
          status: false,
          description: result.description,
          semester: result.semester,
          schoolYear: result.schoolYear
        }

        this.classService.registerToClass(submitData).subscribe({
          next: () => {
            this.toastService.showSuccessToast('Đăng ký thành công');
          },
          error: (err) => {
            this.toastService.showErrorToast(err.error.message);
          }
        });
      }
    });
  }
}
