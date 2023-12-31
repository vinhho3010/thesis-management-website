import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FileUpload } from 'src/app/Model/fileUpload';
import { ClassService } from 'src/app/services/class.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { RefDocsService } from 'src/app/services/ref-docs.service';

@Component({
  selector: 'app-add-doc-type',
  templateUrl: './add-doc-type.component.html',
  styleUrls: ['./add-doc-type.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddDocTypeComponent implements OnInit {
  fileName = '';
  percentage = 0;
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  isShowLoading = false;
  uploadSuccess = false;
  typeName: FormControl = new FormControl('', [Validators.required]);
  typeId = '';
  classId!: string

  addRefDocForm: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    private refDialog: MatDialogRef<AddDocTypeComponent>,
    private toastService: ToastService,
    private refDocService: RefDocsService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addRefDocForm = new FormGroup({
      type: new FormControl(''),
      fileName: new FormControl(''),
      file: new FormControl({}),
    });
  }

  ngOnInit(): void {
    if(this.data.classId){
      this.classId = this.data.classId;
    }
  }

  onFileSelected(event: any) {
    event.preventDefault();
    this.selectedFiles = event.target.files;
    this.fileName = event.target.files[0].name;
    this.uploadSuccess = false;
  }

  upload(): void {
    if (!this.typeName.value) {
      this.toastService.showErrorToast('Vui lòng nhập tên loại tài liệu');
      return;
    }
    this.isShowLoading = true;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.firebaseService
          .addDocForClass(this.classId, this.currentFileUpload, this.typeId)
          .subscribe({
            next: (percentage: any) => {
              this.percentage = Math.round(percentage ? percentage : 0);
            },
            error: (err: any) => {
              this.toastService.showErrorToast(err.error.message);
            },
            complete: () => {
              this.resetForm();
              this.uploadSuccess = true;
              this.refDialog.close();
            },
          });
      }
    }
  }

  onSubmit() {
    if(this.typeName.value){
      this.refDocService.createDocTypeForClass(this.classId, this.typeName.value).subscribe({
        next: (res: any) => {
          this.typeId = res._id;
          if (this.selectedFiles) {
            this.upload();
          } else {
            this.toastService.showSuccessToast('Thêm loại tài liệu thành công');
            this.refDialog.close();
          }
        },
        error: (err: any) => {
          this.toastService.showErrorToast(err.error.message);
        },
      });
    } else {
      this.typeName.markAsTouched();
      this.toastService.showErrorToast('Vui lòng nhập tên loại tài liệu');
    }
  }

  resetForm() {
    this.addRefDocForm.reset();
    this.fileName = '';
    this.percentage = 0;
    this.selectedFiles = undefined;
    this.currentFileUpload = undefined;
    this.isShowLoading = false;
  }
}
