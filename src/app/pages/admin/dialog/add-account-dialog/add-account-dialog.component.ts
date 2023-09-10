import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { FormAction } from 'src/app/Model/enum/form-action';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';
import { ToastService } from 'src/app/services/local/toast.service';
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

  constructor(
    public dialogRef: MatDialogRef<AddAccountDialogComponent>,
    private toastService: ToastService,
    private manageUserService: ManageUserService,
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
    if(this.data){
      this.formAction = FormAction.EDIT;
      this.fillDataToForm();
    } else {
      this.formAction = FormAction.ADD;
    }
  }

  fillDataToForm(){
    if(this.data.role === RoleAccount.STUDENT){
      this.newAccountForm.addControl('class', new FormControl('', Validators.required));
      this.newAccountForm.addControl('major', new FormControl('', Validators.required));
      this.newAccountForm.controls['type'].setValue('student');
    } else if(this.data.role === RoleAccount.TEACHER){
      this.newAccountForm.controls['type'].setValue('teacher');
    } else if(this.data.role === RoleAccount.MINISTRY){
      this.newAccountForm.controls['type'].setValue('ministry');
    }

    this.newAccountForm.patchValue(this.data);
  }

  onClose(result?: any) {
    this.dialogRef.close(result);
  }

  onChangeType(event: MatSelectChange) {
    if (event.value === 'student' && !this.newAccountForm.contains('class') && !this.newAccountForm.contains('major')) {
      this.newAccountForm.addControl('class', new FormControl('', Validators.required));
      this.newAccountForm.addControl('major', new FormControl('', Validators.required));
    } else {
      this.newAccountForm.removeControl('class');
      this.newAccountForm.removeControl('major');
    }
    this.newAccountForm.updateValueAndValidity();
  }

  get submitData() {
    return {
      ...this.newAccountForm.value,
      role: this.buildRole(this.newAccountForm.value.type),
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
