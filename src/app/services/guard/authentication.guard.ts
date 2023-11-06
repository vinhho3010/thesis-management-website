import { Injectable } from "@angular/core";
import { AuthService } from "../auth.service";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { RoleAccount } from "src/app/Model/enum/roleEnum";
import { ToastService } from "../local/toast.service";
import { RouterExtService } from "../ex-router.service";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard {

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

      if(this.authService.isLogin()){
        return true;
      } else {
        //go to login page
        this.toastService.showErrorToast('Bạn cần đăng nhập để truy cập');
        this.router.navigateByUrl('auth/login');
        return false;
      }
  }
}


@Injectable({
  providedIn: 'root',
})
export class MinistryGuard {

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService, private exRouter: RouterExtService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

      if(this.authService.getRole()?.includes(RoleAccount.MINISTRY)){
        return true;
      } else {
        //go to previous page
        this.router.navigate([this.exRouter.getPreviousUrl()]);
        this.toastService.showErrorToast('Bạn không có quyền truy cập');
        return false;
      }
  }
}

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService, private exRouter: RouterExtService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

      if(this.authService.getRole()?.includes(RoleAccount.ADMIN)){
        return true;
      } else {
        //go to previous page
        this.router.navigate([this.exRouter.getPreviousUrl()]);
        this.toastService.showErrorToast('Bạn không có quyền truy cập');
        return false;
      }
  }
}
@Injectable({
  providedIn: 'root',
})
export class TeacherGuard {

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService, private exRouter: RouterExtService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

      if(this.authService.getRole()?.includes(RoleAccount.TEACHER)){
        return true;
      } else {
        //go to previous page
        this.router.navigate([this.exRouter.getPreviousUrl()]);
        this.toastService.showErrorToast('Bạn không có quyền truy cập');
        return false;
      }
  }
}
