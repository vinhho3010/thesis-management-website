import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Class } from 'src/app/Model/class';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';
import { AddStudentToClassComponent } from 'src/app/pages/ministry/dialog/add-student-to-class/add-student-to-class.component';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/local/toast.service';


@Component({
  selector: 'app-class-overview',
  templateUrl: './class-overview.component.html',
  styleUrls: ['./class-overview.component.scss'],
})
export class ClassOverviewComponent implements OnInit {
  classId: string;
  studentList: any[] = [];
  teacher: any;
  paramsSubscription: any;
  currentUser = this.authService.getUser()._id;
  isTeacher = this.authService.getRole() === RoleAccount.TEACHER ? true : false;

  constructor(
    private classService: ClassService,
    private authService: AuthService,
    private toastService: ToastService,
    private loadingService: LoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.classId = this.route.snapshot.paramMap.get('id') as string;
    if(this.authService.getRole() === RoleAccount.STUDENT) {
      this.classId = this.authService.getUser()?.followClass as string;
    }
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      let newId = params.get('id');
      if (newId !== this.classId && this.authService.getRole() === RoleAccount.TEACHER) {
        this.classId = newId as string;
        this.loadStudentList();
      }
    });
  }

  ngOnInit(): void {
    this.loadStudentList();
  }

  loadStudentList(): void {
    this.loadingService.setLoading(true);
    this.classService.getClassInfo(this.classId as string).subscribe({
      next: (res: Class) => {
        this.loadingService.setLoading(false);
        this.studentList = res.student;
        this.teacher = res.teacher;
      },
      error: (err) => {
        this.loadingService.setLoading(false);
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  onMessage(user: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        user,
      },
    };

    this.router.navigate(['/chat'], navigationExtras);

  }

  onAddStudent() {
    this.dialog.open(AddStudentToClassComponent).afterClosed().subscribe({
      next: (res) => {
        if (res?.result) {
          this.loadingService.setLoading(true);
          this.classService.addStudentToClass(this.classId, res.result).subscribe({
            next: (res) => {
              this.loadingService.setLoading(false);
              this.toastService.showSuccessToast('Thêm sinh viên thành công');
              this.loadStudentList();
            },
            error: (err) => {
              this.loadingService.setLoading(false);
              this.toastService.showErrorToast(err.error.message);
            },
          });
        }
      }
    });
  }
}
