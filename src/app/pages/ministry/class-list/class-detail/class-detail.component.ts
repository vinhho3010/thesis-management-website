import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { MajorService } from 'src/app/services/major.service';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss']
})
export class ClassDetailComponent {
  classId = '';
  classDetailForm: FormGroup;
  majors: any[] = [];

    constructor(private activatedRoute: ActivatedRoute, private classService: ClassService, private toastService: ToastService, private majorService: MajorService) {
      this.classDetailForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        semester: new FormControl('', [Validators.required]),
        schoolYear: new FormControl('', [Validators.required]),
        teacher: new FormControl('', [Validators.required]),
        major: new FormControl('', [Validators.required]),
        studentCount: new FormControl('', [Validators.required]),

      });
    }

    ngOnInit(): void {
      this. classId = this.activatedRoute.snapshot.params['id'];
      this.loadMajorList();
      this.loadClassInfo();
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
        }
      })
    }
}
