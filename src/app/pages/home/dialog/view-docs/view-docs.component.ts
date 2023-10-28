import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { ThesisService } from 'src/app/services/thesis.service';

@Component({
  selector: 'app-view-docs',
  templateUrl: './view-docs.component.html',
  styleUrls: ['./view-docs.component.scss'],
})
export class ViewDocsComponent implements OnInit {
  url: string = '';
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private toastService: ToastService,
    private thesisService: ThesisService,
    private commentService: CommentService,

  ) {
    this.url = this.data?.thesisVersion?.url;
    this.comments = this.data?.thesisVersion?.comments;
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.editEditor = new Editor();
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
        belongsTo: this.data?.thesisVersion?._id,
        user: this.authService.getUser()._id,
      };

      this.thesisService.addCommentThesisVersion(this.data?.thesisVersion?._id, comment).subscribe({
        next: (res) => {
          this.toastService.showSuccessToast('Thêm bình luận thành công');
          this.clearCommentForm();
          this.comments.push(res.comments[res.comments.length - 1]);
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
    this.thesisService.deleteCommentThesisVersion(this.data?.thesisVersion?._id, comment._id).subscribe({
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
