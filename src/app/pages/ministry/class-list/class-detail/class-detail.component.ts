import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { AccountInfo } from 'src/app/Model/account-info';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';
import { ClassService } from 'src/app/services/class.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { MajorService } from 'src/app/services/major.service';
import { ManageUserService } from 'src/app/services/manage-user.service';
import { AddStudentToClassComponent } from '../../dialog/add-student-to-class/add-student-to-class.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss']
})
export class ClassDetailComponent {
  classId = '';
  classDetailForm: FormGroup;
  majorsAndTeacher: any[] = [];
  teacher$!: Observable<any[]>;
  selectedTeacher!: AccountInfo;;

  majors: any[] = [];
  teacherList: any[] = [];
  displayedColumns: string[] = ['studentCode', 'fullName', 'class', 'topic', 'actions'];
  dataSource = new MatTableDataSource();

    constructor(private activatedRoute: ActivatedRoute,
       private classService: ClassService,
        private toastService: ToastService,
        private majorService: MajorService,
        private manageUserService: ManageUserService,
        private dialog: MatDialog,
        private router: Router) {
      this.classDetailForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        semester: new FormControl('', [Validators.required]),
        schoolYear: new FormControl('', [Validators.required]),
        teacher: new FormControl('', [Validators.required]),
        major: new FormControl('', [Validators.required]),
        studentCount: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        student: new FormControl([]),
      });
    }

    ngOnInit(): void {
      this.classId = this.activatedRoute.snapshot.params['id'];
      this.loadMajorList();
      this.loadClassInfo();
      this.loadTeacherList();


      this.teacher$ = this.classDetailForm.controls['teacher'].valueChanges.pipe(
        startWith(''),
        map(value => this._filterGroup(value || ''))
      )
    }

    disableInfoField(){
      this.classDetailForm.disable();
      this.classDetailForm.controls['name'].enable();
      this.classDetailForm.controls['teacher'].enable();
      this.classDetailForm.controls['description'].enable();
      this.classDetailForm.controls['student'].enable();
      this.classDetailForm.controls['semester'].enable();
      this.classDetailForm.controls['schoolYear'].enable();
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
        description: data?.description ?? '',
        student: data.student,
      })

      this.dataSource.data = data.student;
      this.selectedTeacher = data.teacher;

    }

    loadClassInfo(): void {
      this.classService.getClassInfo(this.classId).subscribe({
        next: (res) => {
          this.initDetailData(res);
        },
        error: (err) => {
          this.toastService.showErrorToast(err.error.message);
        },
        complete: () => {
          this.disableInfoField();
        }
      })
    }

    onAddStudent(){
      const addStudentDialog = this.dialog.open(AddStudentToClassComponent);
      addStudentDialog.afterClosed().subscribe({
        next: (res) => {
          if(res.result) {
            this.classService.addStudentToClass(this.classId, res.result).subscribe({
              next: () => {
                this.toastService.showSuccessToast('Thêm sinh viên thành công');
                this.loadClassInfo();
              },
              error: (err) => {
                this.toastService.showErrorToast(err.error.message);
              }
            })
          }
        }
      })
    }

    removeStudent(studentId: string){
      this.classService.removeStudentFromClass(this.classId, studentId).subscribe({
        next: () => {
          this.toastService.showSuccessToast('Xóa sinh viên thành công');
          this.loadClassInfo();
        },
        error: (err) => {
          this.toastService.showErrorToast(err.error.message);
        }
      })
    }

    onRemoveStudent(data: any){
      this.toastService.confirmDelete(this.removeStudent.bind(this, data._id));
    }

    updateTeacherData(data: any): void {
      this.selectedTeacher = data;
      this.classDetailForm.controls['teacher'].setValue(data.fullName);
    }

    onSubmit() {
      if(this.classDetailForm.invalid){
        return;
      }
      const data = this.classDetailForm.value;
      const teacherData = {
        _id: this.selectedTeacher._id ?? '',
        fullName: this.selectedTeacher.fullName,
        major: this.selectedTeacher.major,
      }
      data.teacher = teacherData;

      this.classService.update(this.classId, data).subscribe({
        next: () => {
          this.toastService.showSuccessToast('Cập nhật thông tin thành công');
          this.router.navigate(['/ministry/class-list']);
        },
        error: (err) => {
          this.toastService.showErrorToast(err.error.message);
        }
      })
    }


//auto complete
    private _filterGroup(value: string): any[] {
      if (value) {
        return this.majorsAndTeacher
          .map(groupItem => {
            return {
              major: groupItem?.major,
              teachers: this._filter(groupItem.teachers, value)
            }
          })
          .filter(group => group.teachers.length > 0);
      }
      return this.majorsAndTeacher.map(group => group.fullName);
    }

    _filter = (opt: any[], value: string): string[] => {
      const filterValue = value.toUpperCase();
      return opt.filter(item => item?.fullName.toUpperCase().includes(filterValue));
    };
}
