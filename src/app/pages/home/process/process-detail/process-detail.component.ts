import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, Toolbar, Editor } from 'ngx-editor';
import { FileUpload } from 'src/app/Model/fileUpload';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { MilestoneService } from 'src/app/services/milestone.service';
import { ThesisVersionService } from 'src/app/services/thesis-version.service';
import { ThesisService } from 'src/app/services/thesis.service';

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
  currentUser = this.authService.getUser();

  isShowLoading = false;
  isInputFocused = false;
  comments: any[] = [];
  selectedComment: any;
  isEditComment = false;

  addCommentForm = new FormGroup({
    content: new FormControl(
      { value: '', disabled: false },
      Validators.required()
    ),
  });
  editCommentForm = new FormGroup({
    content: new FormControl(
      { value: '', disabled: false },
      Validators.required()
    ),
  });
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  editToolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  editor!: Editor;
  editEditor!: Editor;

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoaderService,
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private thesisVerionService: ThesisVersionService,
    private firebaseService: FirebaseService,
    private thesisService: ThesisService,
    private commentService: CommentService
  ) {
    this.milestoneId = this.route.snapshot.paramMap.get('id') as string;
    this.studentId = this.authService.getUser()?._id as string;
  }

  ngOnInit(): void {
    this.loadCurrentThesisVersion();
    this.editor = new Editor();
    this.editEditor = new Editor();

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
        this.comments = res?.comments;
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
              setTimeout(()=> this.loadCurrentThesisVersion(), 1000);
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

  clearCommentForm(): void {
    this.addCommentForm.reset();
    this.addCommentForm.markAsPristine();
    this.isInputFocused = false;
  }

  onAddComment(): void {
    if (this.addCommentForm.valid) {
      const comment = {
        content: this.addCommentForm.value.content,
        belongsTo: this.currentVersion._id,
        user: this.authService.getUser()._id,
      };

      this.thesisService.addCommentThesisVersion(this.currentVersion._id, comment).subscribe({
        next: (res) => {
          this.toastService.showSuccessToast('Thêm bình luận thành công');
          this.clearCommentForm();
          this.comments.unshift(res.comments[res.comments.length - 1]);
        },
        error: (err) => {
          this.toastService.showErrorToast(err.error.message);
        },
      });
    } else {
      this.addCommentForm.markAllAsTouched();
    }
  }

  onEditComment(comment: any): void {
    this.selectedComment = comment;
    this.editCommentForm.setValue({
      content: comment.content,
    });
    this.isEditComment = true;
  }

  clearEditComment() {
    this.editCommentForm.reset();
    this.editCommentForm.markAsPristine();
    this.isEditComment = false;
  }

  onSubmitEditComment() {
    if(this.editCommentForm.invalid) {
      this.editCommentForm.markAllAsTouched();
      this.toastService.showErrorToast('Vui lòng nhập nội dung');
      return;
    }
    const data = {
      content: this.editCommentForm.value.content,
    };
    this.commentService.update(this.selectedComment._id, data).subscribe({
      next: (res) => {
        this.comments.forEach((comment) => {
          if(comment._id === res._id) {
            comment.content = res.content;
          }
        });
        this.toastService.showSuccessToast('Cập nhật nhận xét thành công');
        this.clearEditComment();
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });

  }

  onDeleteComment(comment: any): void {
    this.toastService.confirmDeleteMessage('Bạn có chắc chắn muốn xóa nhận xét này?', this.deleteCommentHandler.bind(this, comment));
  }

  deleteCommentHandler(comment: any): void {
    this.thesisService.deleteCommentThesisVersion(this.currentVersion._id, comment._id).subscribe({
      next: () => {
        this.comments = this.comments.filter((item) => item._id !== comment._id);
        this.toastService.showSuccessToast('Xóa nhận xét thành công');
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    this.editEditor.destroy();
  }

}
