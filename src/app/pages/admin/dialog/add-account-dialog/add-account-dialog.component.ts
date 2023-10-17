import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { FormAction } from 'src/app/Model/enum/form-action';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';
import { Major } from 'src/app/Model/major.model';
import { ToastService } from 'src/app/services/local/toast.service';
import { MajorService } from 'src/app/services/major.service';
import { ManageUserService } from 'src/app/services/manage-user.service';

@Component({
  selector: 'app-add-account-dialog',
  templateUrl: './add-account-dialog.component.html',
  styleUrls: ['./add-account-dialog.component.scss'],
})
export class AddAccountDialogComponent implements OnInit {
  newAccountForm: FormGroup;
  roleAccount = RoleAccount;
  formAction!: FormAction;
  FormAction = FormAction;
  isShowPassword = false;
  majorList: Major[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddAccountDialogComponent>,
    private toastService: ToastService,
    private manageUserService: ManageUserService,
    private majorService: MajorService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.newAccountForm = new FormGroup({
      type: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8),]),
      fullName: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      phoneNumber: new FormControl(''),
      address: new FormControl(''),
      gender: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.loadMajorList();
    if(this.data && this.data?.isView){
      this.formAction = FormAction.VIEW;
      this.fillDataToFormView();
      this.newAccountForm.disable();
    } else if (this.data){
      this.formAction = FormAction.EDIT;
      this.fillDataToForm();
    } else {
      this.formAction = FormAction.ADD;
    }
  }

  loadMajorList() {
    this.majorService.getAllmajor().subscribe({
      next: (res) => {
        this.majorList = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  fillDataToFormView(){
    this.fillDataToForm();
    this.newAccountForm.disable();
  }

  fillDataToForm(){
    if(this.data.role === RoleAccount.STUDENT){
      this.buildStudentForm();
      this.newAccountForm.controls['type'].setValue('student');
    } else if(this.data.role === RoleAccount.TEACHER){
      this.buildTeacherForm();
      this.newAccountForm.controls['type'].setValue('teacher');
    } else if(this.data.role === RoleAccount.MINISTRY){
      this.newAccountForm.controls['type'].setValue('ministry');
    }
    this.fillData(this.data);
    this.newAccountForm.controls['password'].disable();
    this.newAccountForm.controls['type'].disable();
    this.newAccountForm.controls['email'].disable();
    if(this.newAccountForm.contains('major')){
      this.newAccountForm.controls['major'].disable();
    }
  }

  onClose(result?: any) {
    this.dialogRef.close(result);
  }

  fillData(data: any){
    this.newAccountForm.patchValue(data);
    if(this.newAccountForm.contains('major')){
      this.newAccountForm.controls['major'].setValue(data.major._id);
    }
    if(data?.major && data?.isView){
      this.newAccountForm.get('major')?.setValue(data.major);
    }
  }

  onChangeType(event: MatSelectChange) {
    this.clearOptinalField();
    if (event.value === 'student') {
      this.buildStudentForm();
    } else if (event.value === 'teacher') {
      this.buildTeacherForm();
    }
    this.newAccountForm.reset({type: event.value});
  }

  buildStudentForm() {
    if(!this.newAccountForm.contains('class') || !this.newAccountForm.contains('major')){
      this.newAccountForm.addControl('class', new FormControl('', Validators.required));
      this.newAccountForm.addControl('major', new FormControl('', Validators.required));
    } else {
      this.newAccountForm.removeControl('class');
      this.newAccountForm.removeControl('major');
    }
    this.newAccountForm.updateValueAndValidity();
  }

  buildTeacherForm() {
    if(!this.newAccountForm.contains('major')){
      this.newAccountForm.addControl('major', new FormControl('', Validators.required));
    } else {
      this.newAccountForm.removeControl('major');
    }
    this.newAccountForm.updateValueAndValidity();
  }

  clearOptinalField() {
    if (this.newAccountForm.contains('class')) {
      this.newAccountForm.removeControl('class');
    }
    if (this.newAccountForm.contains('major')) {
      this.newAccountForm.removeControl('major');
    }
    this.newAccountForm.updateValueAndValidity();
  }

  get submitData() {
    if(this.data){
      return {
        ...this.newAccountForm.value,
        role: this.data.role,
      }
    } else {
      return {
        ...this.newAccountForm.value,
        role: this.buildRole(this.newAccountForm.value.type),
      }
    }
  }

  buildRole(type: string) {
    switch (type) {
      case 'student':
        return RoleAccount.STUDENT;
      case 'teacher':
        return RoleAccount.TEACHER;
      case 'ministry':
        return RoleAccount.MINISTRY;
      default:
        return 'student';
    }
  }

  onSubmitData() {
    if (this.newAccountForm.valid) {
      if(this.formAction === FormAction.ADD){
        this.onAddNewAccount();
      } else if(this.formAction === FormAction.EDIT){
        this.onUpdateAccount();
      }
    } else {
      this.newAccountForm.markAllAsTouched();
      this.toastService.showErrorToast('Vui lòng điền đầy đủ thông tin');
    }
  }

  onAddNewAccount() {
    this.manageUserService.createNewAccount(this.submitData).subscribe({
      next: (res) => {
        this.toastService.showSuccessToast('Thêm tài khoản thành công');
        this.onClose(res);
      },
      error: (res) => {
        if (res.status === 409) {
          this.toastService.showErrorToast('Tài khoản đã tồn tại');
        } else {
          this.toastService.showErrorToast('Thêm tài khoản thất bại');
        }
      },
    });
  }

  onUpdateAccount() {
    this.manageUserService.updateAccount(this.data._id, this.submitData).subscribe({
      next: () => {
        this.toastService.showSuccessToast('Cập nhật tài khoản thành công');
        this.onClose(this.submitData);
      },
      error: () => {
        this.toastService.showErrorToast('Cập nhật tài khoản thất bại. Xin hãy thử lại sau');
      },
    });
  }
}
