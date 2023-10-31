import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { passwordMatchingValidatior } from 'src/app/shared/utilities/validators/matchPassword.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  isShowOldPassword = false;
  isShowNewPassword = false;
  isShowConfirmPassword = false;

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', Validators.required),
  }, { validators: passwordMatchingValidatior});

  constructor(
    private authSerivce: AuthService,
    private toastService: ToastService,
    private refDialog: MatDialogRef<ChangePasswordComponent>,
  ) { }

  onSubmit(){
    if(this.changePasswordForm.invalid) {
      this.toastService.showErrorToast('Vui lòng nhập đầy đủ thông tin yêu cầu');
      return;
    }
    const { oldPassword, password } = this.changePasswordForm.value;
    const submitData = {
      oldPassword: oldPassword as string,
      newPassword: password as string,
      _id: this.authSerivce.getUser()._id as string,
    }
    this.authSerivce.changePassword(submitData).subscribe({
      next: (res) => {
        this.toastService.showSuccessToast('Đổi mật khẩu thành công');
        this.refDialog.close();
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
        this.refDialog.close();
      }
    })


  }
}
