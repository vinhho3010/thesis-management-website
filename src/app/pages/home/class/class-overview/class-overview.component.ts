import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/Model/class';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { ToastService } from 'src/app/services/local/toast.service';

@Component({
  selector: 'app-class-overview',
  templateUrl: './class-overview.component.html',
  styleUrls: ['./class-overview.component.scss']
})
export class ClassOverviewComponent implements OnInit {
  classId = this.authService.getUser()?.instructClass ? this.authService.getUser()?.instructClass : this.authService.getUser()?.followClass;
  studentList: any[] = [];
  teacher: any

  constructor(private classService: ClassService, private authService: AuthService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.loadStudentList();
  }


  loadStudentList(): void {
    this.classService.getClassInfo(this.classId as string).subscribe({
      next: (res: Class) => {
        this.studentList = res.student;
        this.teacher = res.teacher;
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }
}
