import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { FileUpload } from 'src/app/Model/fileUpload';
import { Thesis } from 'src/app/Model/thesis';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { ThesisService } from 'src/app/services/thesis.service';

@Component({
  selector: 'app-my-thesis',
  templateUrl: './my-thesis.component.html',
  styleUrls: ['./my-thesis.component.scss'],
})
export class MyThesisComponent implements OnInit {
  thesisInfo!: Thesis;
  versionsHasDocs: any[] = [];
  isCustomFile = new FormControl(false);
  selectedVersion = new FormControl();

  selectedFiles?: FileList;
  fileName: any;
  uploadSuccess = false;
  currentFileUpload: any;
  percentage: number | undefined = undefined;
  isShowLoading = false;

  constructor(
    private thesisService: ThesisService,
    private authService: AuthService,
    private toastService: ToastService,
    private loadingService: LoaderService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.initThesisInfo();
  }

  initThesisInfo(): void {
    const userId = this.authService.getUser()._id;
    this.loadingService.setLoading(true);
    this.thesisService.getStudentThesis(userId).subscribe({
      next: (res) => {
        this.loadingService.setLoading(false);
        this.thesisInfo = res as Thesis;
        this.loadHasDocsVersions();
        this.initFileInput();
      },
      error: (err) => {
        this.loadingService.setLoading(false);
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  loadThesisInfo(): void {
    const userId = this.authService.getUser()._id;
    this.thesisService.getStudentThesis(userId).subscribe({
      next: (res) => {
        this.thesisInfo = res as Thesis;
        this.loadHasDocsVersions();
        this.initFileInput();
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  loadHasDocsVersions(): void {
    this.versionsHasDocs = this.thesisInfo.versions.filter(
      (version: any) => version.url
    );
  }

  initFileInput() {
    if(this.thesisInfo?.isCustomUrl === false) {
      const version = this.versionsHasDocs.find((version: any) => version.url === this.thesisInfo.url);
      this.selectedVersion.setValue(version);
      this.isCustomFile.setValue(this.thesisInfo?.isCustomUrl);
    } else {
      this.fileName = this.thesisInfo?.customFileName;
      this.isCustomFile.setValue(true);
    }
  }

  onFileSelected(event: any) {
    event.preventDefault();
    this.selectedFiles = event.target.files;
    this.fileName = event.target.files[0].name;
    this.uploadSuccess = false;
  }

  clearFileInput() {
    if(this.thesisInfo.url === this.thesisInfo?.customUrl) {
      this.onCancelFile();
    } else {
      this.clearInputHandler();
    }

  }

  clearInputHandler() {
    this.selectedFiles = undefined;
    this.fileName = null;
    this.uploadSuccess = false;
  }

  onChangeMilestoneFile(event: MatSelectChange) {
    this.selectedVersion.setValue(event.value);
    const data = {
      url: event.value.url,
      isCustomUrl: this.isCustomFile.value,
    }
    this.updateThesis(data);
  }

  updateThesis(data: any) {
    const studentId = this.authService.getUser()._id;
    this.thesisService.updateStudentThesis(studentId, data).subscribe({
      next: (res) => {
        this.loadThesisInfo();
        this.toastService.showSuccessToast('Cập nhật thành công');
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  onCheckBoxCustomFileChange(event: MatCheckboxChange) {
    if (event.checked) {
      this.isCustomFile.setValue(true);
      if(this.fileName) {
        const data = {
          url: this.thesisInfo?.customUrl,
          isCustomUrl: true,
        }
        this.updateThesis(data);
      }
    } else {
      this.isCustomFile.setValue(false);
      const lastest = this.versionsHasDocs[this.versionsHasDocs.length - 1];
      this.selectedVersion.setValue(lastest);
      this.updateThesis({url: lastest.url, isCustomUrl: false});
    }
  }

  onSubmitFile() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.isShowLoading = true;
        this.currentFileUpload = new FileUpload(file);
        this.firebaseService.addCustomDocThesis(this.currentFileUpload, this.thesisInfo._id, this.loadThesisInfo.bind(this)).subscribe({
          next: (res) => {
            this.percentage = Math.round(res ? res : 0);
          },
          error: (err) => {
            this.isShowLoading = false;
            this.toastService.showErrorToast(err.error.message);
          },
          complete: ()=> {
            this.isShowLoading = false;
            this.uploadSuccess = true;
            setTimeout(()=> {this.loadThesisInfo();}, 500)
          }
        });

      }
    } else {
      this.toastService.showErrorToast('Vui lòng chọn tài liệu');
    }
  }


  onCancelFileHandler() {
    this.firebaseService.deleteCustomThesisFile(this.thesisInfo._id, this.thesisInfo?.customFileName ?? '', this.loadThesisInfo.bind(this));
  }

  onCancelFile() {
    this.toastService.confirmDeleteMessage('Bạn có chắc chắn muốn hủy bỏ tải lên tài liệu này?', this.onCancelFileHandler.bind(this));
  }
}
