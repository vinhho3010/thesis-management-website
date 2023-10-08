import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FileUpload } from 'src/app/Model/fileUpload';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ToastService } from 'src/app/services/local/toast.service';

@Component({
  selector: 'app-add-doc',
  templateUrl: './add-doc.component.html',
  styleUrls: ['./add-doc.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddDocComponent {
  fileName = '';
  percentage = 0;
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  isShowLoading = false;
  uploadSuccess = false;

  addRefDocForm: FormGroup;

  constructor(private firebaseService: FirebaseService, private refDialog: MatDialogRef<AddDocComponent>, private toastService: ToastService) {
    this.addRefDocForm = new FormGroup({
      type: new FormControl(''),
      fileName: new FormControl(''),
      file: new FormControl({}),
    });
   }

  onFileSelected(event: any) {
    event.preventDefault();
    this.selectedFiles = event.target.files;
    this.fileName = event.target.files[0].name;
    this.uploadSuccess = false;
  }

  upload(): void {
    this.isShowLoading = true;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.firebaseService.addDocForClass(this.currentFileUpload).subscribe({
          next: (percentage: any) => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error: (err: any) => {
            this.toastService.showErrorToast(err.error.message);
          },
          complete: () => {
            this.isShowLoading = false;
            this.uploadSuccess = true;
            this.refDialog.close();
          }
        });
      }
    }
  }
}
