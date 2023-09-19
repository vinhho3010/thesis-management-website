import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { schoolYear, semester } from 'src/app/Model/enum/schoolYear';
import { Major } from 'src/app/Model/major.model';
import { ToastService } from 'src/app/services/local/toast.service';
import { MajorService } from 'src/app/services/major.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {
  majorList: Major[] = [];
  schoolYear = schoolYear;
  semester = semester;
  newClassForm: FormGroup;

  constructor(
    private majorService: MajorService,
    private toastService: ToastService,
  ) {
    this.newClassForm = new FormGroup({
      name: new FormControl('', { validators: [Validators.required], updateOn: 'change' }),
      schoolYear: new FormControl('', { validators: [Validators.required], updateOn: 'change' }),
      semester: new FormControl('', { validators: [Validators.required], updateOn: 'change' }),
      major: new FormControl('', { validators: [Validators.required], updateOn: 'change' }),
      teacher: new FormControl('', { validators: [Validators.required], updateOn: 'change' }),
    });

  }

  ngOnInit(): void {
    this.loadMajorList();
  }

  _onListeningFormChange() {
    this.newClassForm.valueChanges
    .pipe(
      debounceTime(500),
    )
    .subscribe((res) => {
      this.renderInputField();
    });
  }

  renderInputField() {
    const schoolYear = this.newClassForm.get('schoolYear')?.value;
    const semester = this.newClassForm.get('semester')?.value;
    const major = this.newClassForm.get('major')?.value;
    const teacher = this.newClassForm.get('teacher')?.value;
    const name = this.newClassForm.get('name')?.value;

    if(name) {
      this.newClassForm.get('semester')?.enable();
    }

    if (name && semester) {
      this.newClassForm.get('schoolYear')?.enable();
    }

    if(name && semester && schoolYear) {
      this.newClassForm.get('major')?.enable();
    }

    if(name && semester && schoolYear && major) {
      this.newClassForm.get('teacher')?.enable();
    }
  }

  initDisableInputField() {
    this.newClassForm.get('schoolYear')?.disable();
    this.newClassForm.get('semester')?.disable();
    this.newClassForm.get('major')?.disable();
    this.newClassForm.get('teacher')?.disable();
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
        this._onListeningFormChange();
      }
    });
  }
}
