import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Class } from 'src/app/Model/class';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';
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

  constructor(
    private classService: ClassService,
    private authService: AuthService,
    private toastService: ToastService,
    private loadingService: LoaderService,
    private route: ActivatedRoute
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
}
