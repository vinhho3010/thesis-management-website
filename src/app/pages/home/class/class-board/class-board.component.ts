import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { PostService } from 'src/app/services/post.service';
import { ToastService } from 'src/app/services/local/toast.service';

@Component({
  selector: 'app-class-board',
  templateUrl: './class-board.component.html',
  styleUrls: ['./class-board.component.scss'],
})
export class ClassBoardComponent implements OnInit {
  className = '';
  classId = this.authService.getClassInfo() ? this.authService.getClassInfo() : '';
  teacher: any;
  postList = [] as any[];

  createPostForm: FormGroup;
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  isCreatePostFocused = false;
  isLoading = false;

  constructor(
    private classService: ClassService,
    private authService: AuthService,
    private postService: PostService,
    private toastService: ToastService
  ) {
    this.createPostForm = new FormGroup({
      content: new FormControl(
        { value: '', disabled: false },
        Validators.required()
      ),
    });
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.initClassInfo();
    this.getPostListByClass();
  }

  initClassInfo(): void {
    this.classService.getClassInfo(this.classId as string).subscribe({
      next: (res) => {
        this.className = res?.name ?? 'Nhóm 1';
        this.teacher = res.teacher;
      },
    });
  }

  clearCreatePostForm(): void {
    this.createPostForm.reset();
    this.isCreatePostFocused = false;
  }

  onCreatePost(): void {
    const data = {
      content: this.createPostForm.get('content')?.value,
      class: this.classId,
      user: this.teacher.id,
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
}
