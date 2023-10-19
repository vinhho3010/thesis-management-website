import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { PostService } from 'src/app/services/post.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-class-board',
  templateUrl: './class-board.component.html',
  styleUrls: ['./class-board.component.scss'],
})
export class ClassBoardComponent implements OnInit {
  defaultAvatar = 'assets/picture/default-avatar.svg';
  className = '';
  classId = this.authService.getClassId() ? this.authService.getClassId() : '';
  teacher: any;
  postList = [] as any[];
  selectedEditPost = {} as any;

  createPostForm: FormGroup;
  editPostForm: FormGroup;
  editor!: Editor;
  editEditor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  isCreatePostFocused = false;
  isLoading = false;
  isEditLoading = false;
  isTeacher = this.authService.getRole() === RoleAccount.TEACHER;
  isEditPost = false;

  constructor(
    private classService: ClassService,
    private authService: AuthService,
    private postService: PostService,
    private toastService: ToastService,
    private loadingService: LoaderService
  ) {
    this.createPostForm = new FormGroup({
      content: new FormControl(
        { value: '', disabled: false },
        Validators.required()
      ),
    });
    this.editPostForm = new FormGroup({
      content: new FormControl(
        { value: '', disabled: false },
        Validators.required()
      ),
    });
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.editEditor = new Editor();
    this.initClassInfo();
    this.getPostListByClass();
  }

  initClassInfo(): void {
    this.loadingService.setLoading(true);
    this.classService.getClassInfo(this.classId as string).subscribe({
      next: (res) => {
        this.loadingService.setLoading(false);
        this.className = res?.name ?? 'Nhóm 1';
        this.teacher = res.teacher;
      },
      error: (err) => {
        this.loadingService.setLoading(false);
        this.toastService.showErrorToast(err.error.message);
      }
    });
  }

  clearCreatePostForm(): void {
    this.createPostForm.reset();
    this.createPostForm.markAsPristine();
    this.isCreatePostFocused = false;
  }

  clearEditPostForm(): void {
    this.editPostForm.reset();
    this.editPostForm.markAsPristine();
    this.isEditPost = false;
  }

  onCreatePost(): void {
    if(this.createPostForm.invalid) {
      this.createPostForm.markAsDirty();
      this.toastService.showErrorToast('Vui lòng nhập nội dung');
      return;
    };
    const data = {
      content: this.createPostForm.get('content')?.value,
      class: this.classId,
      user: this.authService.getUser()._id,
    };
    this.isLoading = true;
    this.postService.createPost(data).subscribe({
      next: (res) => {
        this.clearCreatePostForm();
        this.initClassInfo();
        this.getPostListByClass();
        this.toastService.showSuccessToast('Đăng bài thành công');
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getPostListByClass(): void {
    this.postService.getPostByClassId(this.classId as string).subscribe({
      next: (res) => {
        this.postList = res;
      },
    });
  }

  onDeltePost(post: any): void {
    this.toastService.confirmHandle('Bạn có chắc chắn muốn xóa thông báo này?', this.deletePostHandler.bind(this, post._id));
  }

  deletePostHandler(postId: string): void {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.toastService.showSuccessToast('Xóa thông báo thành công');
        this.getPostListByClass();
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  onEditPost(post: any): void {
    this.isEditPost = true;
    this.selectedEditPost = post;
    this.editPostForm.get('content')?.setValue(post.content);
  }

  onUpdatePost(post: any): void {
    if(this.editPostForm.invalid) {
      this.editPostForm.markAsDirty();
      this.toastService.showErrorToast('Nội dung không được để trống');
      return;
    };
    const data = {
      class: this.classId,
      user: this.authService.getUser()?._id,
      content: this.editPostForm.get('content')?.value,
    };
    this.isEditLoading = true;
    this.postService.updatePost(post._id, data).subscribe({
      next: () => {
        this.clearEditPostForm();
        this.toastService.showSuccessToast('Cập nhật thông báo thành công');
        this.getPostListByClass();
        this.isEditPost = false;
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
      complete: () => {
        this.isEditLoading = false;
      },
    });
  }
}
