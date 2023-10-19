import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { StorageService } from 'src/app/services/local/storage.service';
import { ToastService } from 'src/app/services/local/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    isRemember: new FormControl(false),
  });

  isShowPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    private storageService: StorageService,
    private loadingService: LoaderService
  ) {}

  ngOnInit(): void {
    this.storageService.clean();
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loadingService.setLoading(true);
    this.authService
      .login(
        this.loginForm.value.email as string,
        this.loginForm.value.password as string
      )
      .subscribe({
        next: (res) => {
          this.loadingService.setLoading(false);
          this.authService.saveUser(res.data);
          this.toast.showSuccessToast('Đăng nhập thành công');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loadingService.setLoading(false);
          this.toast.showErrorToast('Đăng nhập thất bại');
        },
      });
  }
}
