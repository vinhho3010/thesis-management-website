import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { debounceTime } from 'rxjs';
import { schoolYear, semester } from 'src/app/Model/enum/schoolYear';
import { Major } from 'src/app/Model/major.model';
import { ClassService } from 'src/app/services/class.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { MajorService } from 'src/app/services/major.service';
import { ManageUserService } from 'src/app/services/manage-user.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss'],
})
export class AddClassComponent implements OnInit {
  majorList: Major[] = [];
  schoolYear = schoolYear;
  semester = semester;
  newClassForm: FormGroup;
  teacherByMajor: any[] = [];

  constructor(
    private majorService: MajorService,
    private toastService: ToastService,
    private manageUserService: ManageUserService,
    private classService: ClassService,
    private matDialogRef: MatDialogRef<AddClassComponent>
  ) {
    this.newClassForm = new FormGroup({
      name: new FormControl('', { validators: [Validators.required] }),
      schoolYear: new FormControl('', { validators: [Validators.required] }),
      semester: new FormControl('', { validators: [Validators.required] }),
      major: new FormControl('', { validators: [Validators.required] }),
      teacher: new FormControl('', { validators: [Validators.required] }),
    });
  }

  ngOnInit(): void {
    this.loadMajorList();
  }

  initDisableInputField() {
    this.newClassForm.controls['teacher'].disable();
  }

  onClose() {
    this.matDialogRef.close();
  }

  onSubmit() {
    this.classService.createClass(this.submitData).subscribe({
      next: (res) => {
        this.toastService.showSuccessToast('Tạo nhóm hướng dẫn thành công');
        this.matDialogRef.close();
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }

  get submitData() {
    return {
      name: this.newClassForm.get('name')?.value,
      semester: this.newClassForm.get('semester')?.value,
      schoolYear: this.newClassForm.get('schoolYear')?.value,
      major: this.newClassForm.get('major')?.value,
      teacher: this.newClassForm.get('teacher')?.value,
    }
  }

  onChangeMajor(event: MatSelectChange) {
    this.newClassForm.controls['teacher'].enable();
    this.newClassForm.controls['teacher'].reset();
    const selectedMajor = this.newClassForm.get('major')?.value;

    this.manageUserService.getTeacherByMajor(selectedMajor).subscribe({
      next: (res) => {
        this.teacherByMajor = res;
        if (this.teacherByMajor.length === 0) {
          this.newClassForm.controls['teacher'].disable();
        }
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }

  loadMajorList() {
    this.majorService.getAllmajor().subscribe({
      next: (res) => {
        this.majorList = res;
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
      complete: () => {
        this.initDisableInputField();
      },
    });
  }
}
