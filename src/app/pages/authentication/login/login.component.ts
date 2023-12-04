import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';
import { AuthService, TOKEN_KEY, USER_SAVE_KEY } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { StorageService } from 'src/app/services/local/storage.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { WebSocketService } from 'src/app/services/websocket.service';
import { textAppearAnimation } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [textAppearAnimation],
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
  textAppearState = 'hidden';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    private storageService: StorageService,
    private loadingService: LoaderService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.clearAuthData();

    setTimeout(() => {
      this.textAppearState = 'visible';
    }, 200);
  }

  submit() {
    if (this.loginForm.invalid) {
      this.toast.showErrorToast('Vui lòng nhập đầy đủ thông tin');
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
          this.navigateBaseOnRole(this.authService.getRole());
          this.toast.showSuccessToast('Đăng nhập thành công');
          this.setRemember();
        },
        error: (err) => {
          this.loadingService.setLoading(false);
          this.toast.showErrorToast('Đăng nhập thất bại');
        },
      });
  }

  setRemember() {
    if (this.loginForm.value.isRemember as boolean === true && this.loginForm.value.email as string !== '') {
      this.authService.setRemember(true, this.loginForm.value.email as string);
    } else {
      this.authService.setRemember(false, '');
    }
  }

  clearAuthData() {
    this.storageService.remove(TOKEN_KEY);
    this.storageService.remove(USER_SAVE_KEY);

    if(this.authService.isRemember()){
      this.loginForm.patchValue({
        email: this.authService.getRememberEmail(),
        isRemember: true
      })
    }
  }

  navigateBaseOnRole(role: RoleAccount | null) {
    switch (role) {
      case RoleAccount.ADMIN:
        this.router.navigate(['/admin']);
        break;
      case RoleAccount.TEACHER:
      case RoleAccount.STUDENT:
        this.router.navigate(['/home']);
        break;
      case RoleAccount.MINISTRY:
        this.router.navigate(['/ministry']);
        break;
    }
  }
}
