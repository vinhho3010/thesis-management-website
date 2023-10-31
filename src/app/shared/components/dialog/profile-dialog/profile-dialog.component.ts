import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { FormAction } from 'src/app/Model/enum/form-action';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';
import { Major } from 'src/app/Model/major.model';
import { AddAccountDialogComponent } from 'src/app/pages/admin/dialog/add-account-dialog/add-account-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { MajorService } from 'src/app/services/major.service';
import { ManageUserService } from 'src/app/services/manage-user.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { Observable, finalize } from 'rxjs';
import { FileUpload } from 'src/app/Model/fileUpload';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent {
  defaultAvatar = '../../../../../assets/picture/default-avatar.svg';
  basePathImages = '/images';
  infoAccountForm: FormGroup;
  roleAccount = RoleAccount;
  formAction!: FormAction;
  FormAction = FormAction;
  isShowPassword = false;
  majorList: Major[] = [];
  data: any;
  fileUploads?: any;
  fileUpload?: FileUpload;
  percentage?: number;


  constructor(
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    private toastService: ToastService,
    private manageUserService: ManageUserService,
    private majorService: MajorService,
    private authService: AuthService,
    private dialog: MatDialog,
    private storage: AngularFireStorage,

  ) {
    this.infoAccountForm = new FormGroup({
      type: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8),]),
      fullName: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      phoneNumber: new FormControl(''),
      address: new FormControl(''),
      gender: new FormControl('', Validators.required),
      avatar: new FormControl(),
    });
  }

  onSelectFile(event: any) {

  }

  ngOnInit(): void {
    this.initData();
    this.loadMajorList();
    this.fillDataToForm();
  }

  initData() {
    this.data = this.authService.getUser();
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
    this.infoAccountForm.disable();
  }

  fillDataToForm(){
    if(this.data.role === RoleAccount.STUDENT){
      this.buildStudentForm();
      this.infoAccountForm.controls['type'].setValue('student');
    } else if(this.data.role === RoleAccount.TEACHER){
      this.buildTeacherForm();
      this.infoAccountForm.controls['type'].setValue('teacher');
    } else if(this.data.role === RoleAccount.MINISTRY){
      this.infoAccountForm.controls['type'].setValue('ministry');
    }
    this.fillData(this.data);
    this.infoAccountForm.controls['password'].disable();
    this.infoAccountForm.controls['type'].disable();
    this.infoAccountForm.controls['email'].disable();
    this.infoAccountForm.controls['code'].disable();
    this.infoAccountForm.controls['fullName'].disable();
    this.infoAccountForm.controls['gender'].disable();



    if(this.infoAccountForm.contains('major')){
      this.infoAccountForm.controls['major'].disable();
    }
    if(this.infoAccountForm.contains('class')){
      this.infoAccountForm.controls['class'].disable();
    }
  }

  onClose(result?: any) {
    this.dialogRef.close(result);
  }

  fillData(data: any){
    this.infoAccountForm.patchValue(data);
    if(this.infoAccountForm.contains('major')){
      this.infoAccountForm.controls['major'].setValue(data.major._id);
    }
    if(data?.major && data?.isView){
      this.infoAccountForm.get('major')?.setValue(data.major);
    }
  }

  onChangeType(event: MatSelectChange) {
    this.clearOptinalField();
    if (event.value === 'student') {
      this.buildStudentForm();
    } else if (event.value === 'teacher') {
      this.buildTeacherForm();
    }
    this.infoAccountForm.reset({type: event.value});
  }

  buildStudentForm() {
    if(!this.infoAccountForm.contains('class') || !this.infoAccountForm.contains('major')){
      this.infoAccountForm.addControl('class', new FormControl('', Validators.required));
      this.infoAccountForm.addControl('major', new FormControl('', Validators.required));
    } else {
      this.infoAccountForm.removeControl('class');
      this.infoAccountForm.removeControl('major');
    }
    this.infoAccountForm.updateValueAndValidity();
  }

  buildTeacherForm() {
    if(!this.infoAccountForm.contains('major')){
      this.infoAccountForm.addControl('major', new FormControl('', Validators.required));
    } else {
      this.infoAccountForm.removeControl('major');
    }
    this.infoAccountForm.updateValueAndValidity();
  }

  clearOptinalField() {
    if (this.infoAccountForm.contains('class')) {
      this.infoAccountForm.removeControl('class');
    }
    if (this.infoAccountForm.contains('major')) {
      this.infoAccountForm.removeControl('major');
    }
    this.infoAccountForm.updateValueAndValidity();
  }

  get submitData() {
      return {
        ...this.infoAccountForm.value,
        role: this.authService.getRole(),
      }
  }

  onUpdateAccount() {
    this.manageUserService.updateAccount(this.data._id, this.submitData).subscribe({
      next: (res) => {
        this.toastService.showSuccessToast('Cập nhật thông tin tài khoản thành công');
        this.authService.saveUserData(
          {
            ...this.authService.getUser(),
          address: this.submitData.address,
          phoneNumber: this.submitData.phoneNumber,
          avatar: this.submitData.avatar,
          }
        )
        this.onClose(res);
      },
      error: () => {
        this.toastService.showErrorToast('Cập nhật tài khoản thất bại. Xin hãy thử lại sau');
      },
    });
  }

  onUpdateAvatar() {
    this.manageUserService.updateAccount(this.data._id, this.submitData).subscribe({
      next: (res) => {
        this.toastService.showSuccessToast('Cập nhật thông tin tài khoản thành công');
        this.authService.saveUserData(
          {
            ...this.authService.getUser(),
          address: this.submitData.address,
          phoneNumber: this.submitData.phoneNumber,
          avatar: this.submitData.avatar,
          }
        )
      },
      error: () => {
        this.toastService.showErrorToast('Cập nhật tài khoản thất bại. Xin hãy thử lại sau');
      },
    });
  }

  onChangePassword() {
    this.dialog.open(ChangePasswordComponent)
  }

  pushImageToStorage(fileUpload: FileUpload, oldImages: string): Observable<number | undefined> {
    const filePath = `${this.basePathImages}/${new Date().getTime()}_${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          this.infoAccountForm.controls['avatar'].setValue(downloadURL);
          this.infoAccountForm.controls['avatar'].updateValueAndValidity();
          this.onUpdateAvatar();
          if(oldImages){
            this.storage.storage.refFromURL(oldImages).delete();
          }
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  //display blob of selected image
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.fileUpload = new FileUpload(file);
        this.fileUploads = this.pushImageToStorage(this.fileUpload, this.data.avatar);
      };
    }
    event.target.value = '';
  }
}
