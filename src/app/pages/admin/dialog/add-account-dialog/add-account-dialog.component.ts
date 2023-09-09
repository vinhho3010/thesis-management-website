import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/local/toast.service';

@Component({
  selector: 'app-add-account-dialog',
  templateUrl: './add-account-dialog.component.html',
  styleUrls: ['./add-account-dialog.component.scss']
})
export class AddAccountDialogComponent {
newAccountForm = new FormGroup({
  type: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  fullName: new FormControl('', Validators.required),
  code: new FormControl('', Validators.required),
  phoneNumber: new FormControl(''),
  address: new FormControl(''),
  gender: new FormControl('', Validators.required),
})


constructor(public dialogRef: MatDialogRef<AddAccountDialogComponent>, private toastService: ToastService) { }


  onClose(){
    this.dialogRef.close();
  }

  onSubmitData(){
    if(this.newAccountForm.valid){
      console.log(this.newAccountForm.value)
      this.toastService.showSuccessToast('Thêm tài khoản thành công')
      this.onClose();
    } else {
      console.log(this.newAccountForm.value);

      this.newAccountForm.markAllAsTouched();
      this.toastService.showErrorToast('Vui lòng điền đầy đủ thông tin')
    }
  }
}
