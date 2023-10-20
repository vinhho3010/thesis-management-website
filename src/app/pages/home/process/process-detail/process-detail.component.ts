import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'src/app/Model/fileUpload';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { MilestoneService } from 'src/app/services/milestone.service';
import { ThesisVersionService } from 'src/app/services/thesis-version.service';

@Component({
  selector: 'app-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.scss']
})
export class ProcessDetailComponent implements OnInit {
  milestoneId: string;
  studentId: string;
  currentMilestone: any;
  currentVersion: any;
  selectedFiles?: FileList;
  fileName: any;
  uploadSuccess = false;
  currentFileUpload: any;
  percentage: number | undefined = undefined;

  isShowLoading = false;

  constructor(
    private milestoneService: MilestoneService,
    private route: ActivatedRoute,
    private loadingService: LoaderService,
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private thesisVerionService: ThesisVersionService,
    private firebaseService: FirebaseService,
  ) {
    this.milestoneId = this.route.snapshot.paramMap.get('id') as string;
    this.studentId = this.authService.getUser()?._id as string;
  }

  ngOnInit(): void {
    this.loadCurrentThesisVersion();
  }

  onFileSelected(event: any) {
    event.preventDefault();
    this.selectedFiles = event.target.files;
    this.fileName = event.target.files[0].name;
    this.uploadSuccess = false;
  }

  clearFileInput() {
    this.selectedFiles = undefined;
    this.fileName = null;
    this.uploadSuccess = false;
  }

  loadCurrentThesisVersion(): void {
    this.loadingService.setLoading(true);
    this.clearFileInput();
    this.thesisVerionService.getVersionStudentMilestone(this.studentId, this.milestoneId).subscribe({
      next: (res) => {
        this.loadingService.setLoading(false);
        this.currentVersion = res;
        this.currentMilestone = res?.milestone;
        if(this.currentVersion?.url){
          this.fileName = this.currentVersion?.fileName;
        }
      },
      error: (err) => {
        this.loadingService.setLoading(false);
        this.toastService.showErrorToast(err.error.message);
      }
    });
  }

  onNavigateBack() {
    this.router.navigate(['/process']);
  }

  onSubmitFile() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.isShowLoading = true;
        this.currentFileUpload = new FileUpload(file);
        this.firebaseService
          .addDocForThesisVersion(this.currentFileUpload, this.currentVersion._id)
          .subscribe({
            next: (percentage: any) => {
              this.percentage = Math.round(percentage ? percentage : 0);
            },
            error: (err: any) => {
              this.toastService.showErrorToast(err.error.message);
            },
            complete: () => {
              this.uploadSuccess = true;
              this.isShowLoading = false;
              setTimeout(()=> this.loadCurrentThesisVersion(), 500);
            },
          });

      }
    } else {
      this.toastService.showErrorToast('Vui lòng chọn tài liệu');
    }
  }

  onCancelFileHandler() {
    this.firebaseService.deleteThesisVersionFile(this.currentVersion._id, this.currentVersion?.fileName, this.loadCurrentThesisVersion.bind(this));
  }

  onCancelFile() {
    this.toastService.confirmDeleteMessage('Bạn có chắc chắn muốn hủy bỏ nộp tài liệu này?', this.onCancelFileHandler.bind(this));
  }

}
