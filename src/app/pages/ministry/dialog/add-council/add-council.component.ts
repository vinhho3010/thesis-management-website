import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { schoolYear, semester } from 'src/app/Model/enum/schoolYear';
import { Major } from 'src/app/Model/major.model';
import { ClassService } from 'src/app/services/class.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { MajorService } from 'src/app/services/major.service';
import { ManageUserService } from 'src/app/services/manage-user.service';

@Component({
  selector: 'app-add-council',
  templateUrl: './add-council.component.html',
  styleUrls: ['./add-council.component.scss']
})
export class AddCouncilComponent implements OnInit {
  majorList: Major[] = [];
  schoolYear = schoolYear;
  semester = semester;
  newCouncilForm: FormGroup;
  teacherByMajor = [] as any[];

  constructor(
    private majorService: MajorService,
    private toastService: ToastService,
    private manageUserService: ManageUserService,
    private classService: ClassService,
    private matDialogRef: MatDialogRef<AddCouncilComponent>
  ) {
    this.newCouncilForm = new FormGroup({
      name: new FormControl('', { validators: [Validators.required] }),
      schoolYear: new FormControl('', { validators: [Validators.required] }),
      semester: new FormControl('', { validators: [Validators.required] }),
      major: new FormControl('', { validators: [Validators.required] }),
      president: new FormControl('', { validators: [Validators.required] }),
      secretary: new FormControl('', { validators: [Validators.required] }),
      member: new FormControl('', { validators: [Validators.required] }),
      //otherMember: new FormControl('', { validators: [Validators.required] }),
    });
  }

  ngOnInit(): void {
    this.loadMajorList();
  }

  loadMajorList() {
    this.majorService.getAllmajor().subscribe({
      next: (res) => {
        this.majorList = res;
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  onChangeMajor(event: MatSelectChange) {
    const selectedMajor = this.newCouncilForm.get('major')?.value;

    this.manageUserService.getTeacherByMajor(selectedMajor).subscribe({
      next: (res) => {
        this.teacherByMajor = res;
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }

  onSubmit() {
    if(this.newCouncilForm.invalid) {
      this.toastService.showErrorToast('Vui lòng điền đầy đủ thông tin');
      return;
    }
    this.matDialogRef.close({
      submitData: this.newCouncilForm.value
    });
  }
}
