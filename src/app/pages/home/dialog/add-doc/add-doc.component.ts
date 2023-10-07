import { Component } from '@angular/core';
import { FileUpload } from 'src/app/Model/fileUpload';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-add-doc',
  templateUrl: './add-doc.component.html',
  styleUrls: ['./add-doc.component.scss']
})
export class AddDocComponent {
  fileName = '';
  percentage = 0;
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  isShowLoading = false;
  uploadSuccess = false;

  constructor(private firebaseService: FirebaseService) {

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
        this.firebaseService.pushFileToStorage(this.currentFileUpload).subscribe({
          next: (percentage) => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.isShowLoading = false;
            this.uploadSuccess = true;
          }
        });
      }
    }
  }
}
