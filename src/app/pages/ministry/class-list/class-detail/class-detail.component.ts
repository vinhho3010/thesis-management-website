import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';
import { ClassService } from 'src/app/services/class.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { MajorService } from 'src/app/services/major.service';
import { ManageUserService } from 'src/app/services/manage-user.service';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss']
})
export class ClassDetailComponent {
  classId = '';
  classDetailForm: FormGroup;
  majorsAndTeacher: any[] = [];

  majors: any[] = [];
  teacherList: any[] = [];

    constructor(private activatedRoute: ActivatedRoute,
       private classService: ClassService,
        private toastService: ToastService,
        private majorService: MajorService,
        private manageUserService: ManageUserService) {
      this.classDetailForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        semester: new FormControl('', [Validators.required]),
        schoolYear: new FormControl('', [Validators.required]),
        teacher: new FormControl('', [Validators.required]),
        major: new FormControl('', [Validators.required]),
        studentCount: new FormControl('', [Validators.required]),
        description: new FormControl(''),
      });
    }

    ngOnInit(): void {
      this. classId = this.activatedRoute.snapshot.params['id'];
      this.loadMajorList();
      this.loadClassInfo();
      this.loadTeacherList();
    }

    disableInfoField(){
      this.classDetailForm.disable();
      this.classDetailForm.controls['name'].enable();
      this.classDetailForm.controls['teacher'].enable();
    }

    loadTeacherList() {
      this.manageUserService.getAllAccount(RoleAccount.TEACHER).subscribe({
        next: (res) => {
          this.teacherList = res;
          this.mapTeacherListByMajor();
        },
        error: (err) => {
          this.toastService.showErrorToast(err.error.message);
        }
      })
    }

    mapTeacherListByMajor(){
      this.majorsAndTeacher = this.majors.map(major => {
        const teachers = this.teacherList.filter(teacher => teacher.major.name === major.name);
        return { major: major.name, teachers };
      });
    }

    loadMajorList(): void {
      this.majorService.getAllmajor().subscribe({
        next: (res) => {
          this.majors = res;
        },
        error: (err) => {
          this.toastService.showErrorToast(err.error.message);
        }
      })
    }

    initDetailData(data: any): void {
      this.classDetailForm.setValue({
        name: data.name,
        semester: data.semester,
        schoolYear: data.schoolYear,
        teacher: data.teacher.fullName,
        major: data.major,
        studentCount: data.student.length,
      })
    }

    loadClassInfo(): void {
      this.classService.getClassInfo(this.classId).subscribe({
        next: (res) => {
          this.classDetailForm.setValue({
            name: res.name,
            semester: res.semester,
            schoolYear: res.schoolYear,
            teacher: res.teacher.fullName,
            major: res.major,
            studentCount: res.student.length,
          });
        },
        error: (err) => {
          this.toastService.showErrorToast(err.error.message);
        },
        complete: () => {
          this.disableInfoField();
        }
      })
    }
}
