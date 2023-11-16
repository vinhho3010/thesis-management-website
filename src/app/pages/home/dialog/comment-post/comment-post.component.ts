import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, Toolbar, Editor } from 'ngx-editor';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { PostService } from 'src/app/services/post.service';
import { ThesisService } from 'src/app/services/thesis.service';

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.scss']
})
export class CommentPostComponent {
  url: string = '';
  isInputFocused = false;
  comments: any[] = [];
  selectedComment: any;
  isEditComment = false;
  currentUser = this.authService.getUser();

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
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['underline', 'strike'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  editToolbar: Toolbar = [
    ['bold', 'italic'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
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
    private postService: PostService,
    private commentService: CommentService,

  ) {
    this.comments = this.data?.post?.comments;
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
        belongsTo: this.data?.post?._id,
        user: this.authService.getUser()._id,
      };

      this.postService.addCommentPost(this.data?.post?._id, comment).subscribe({
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
        this.toastService.showSuccessToast('Cập nhật bình luận thành công');
        this.clearEditComment();
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });

  }

  onDeleteComment(comment: any): void {
    this.toastService.confirmDeleteMessage('Bạn có chắc chắn muốn xóa bình luận này?', this.deleteCommentHandler.bind(this, comment));
  }

  deleteCommentHandler(comment: any): void {
    this.postService.deleteCommentPost(this.data?.post?._id, comment._id).subscribe({ //TODO
      next: () => {
        this.comments = this.comments.filter((item) => item._id !== comment._id);
        this.toastService.showSuccessToast('Xóa bình luận thành công');
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
