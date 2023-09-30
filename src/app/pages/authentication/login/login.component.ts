import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/local/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    isRemember: new FormControl(false)
  });

  isShowPassword = false;

  constructor(private authService: AuthService,
     private router: Router,
     private toast: ToastService) { }

  submit(){
    if(this.loginForm.invalid){
      return;
    }

    this.authService.login(this.loginForm.value.email as string, this.loginForm.value.password as string).subscribe({
      next: (res) => {
        this.toast.showSuccessToast('Đăng nhập thành công');
        this.router.navigate(['/home']);
        this.authService.saveUser(res.data);
      },
      error: (err) => {
        this.toast.showErrorToast('Đăng nhập thất bại');
      }
    })


  }
}
