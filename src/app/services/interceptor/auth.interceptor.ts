import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { noAuthList } from '../../shared/helper/noAuthList';
import { ToastService } from '../local/toast.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  isRefreshed = false;

  constructor(private authService: AuthService, private toastService: ToastService) {}

  intercept( req: HttpRequest<unknown>, next: HttpHandler ): Observable<HttpEvent<unknown>> {
    //attach token to request
    const res = this.addHeaderToken(req, this.authService.getAccessToken());

    return next.handle(res).pipe(
      catchError((error: HttpErrorResponse) => {
        //if token is expired, refresh it and retry the request
        if (error.status === 401 && !this.isRefreshed) {
          this.isRefreshed = true;

          //if logined user, logout
          if(this.authService.isLogin()){
            this.toastService.showErrorToast('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
            this.authService.logout();
          }
          //TODO enable when backend implement refresh token
          //this.handleRefreshToken(req, next);
        }
        this.isRefreshed = false;
        return throwError(() => error);
      })
    );
  }

  addHeaderToken(req: HttpRequest<unknown>,token: string | null): HttpRequest<unknown> {
    if(noAuthList.includes(req.url) || !token) return req;
    return req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // handleRefreshToken( req: HttpRequest<unknown>, next: HttpHandler ): Observable<HttpEvent<unknown>> {
  //   return this.authService.getRefreshToken().pipe(
  //     switchMap((data: unknown) => {
  //       //TODO - Check the response of refresh Api and apply it here
  //       this.authService.saveToken(data);
  //       const res = this.addHeaderToken(req, data as string);
  //       return next.handle(res);
  //     }),
  //     //if refresh token fails, logout
  //     catchError((error: HttpErrorResponse) => {
  //       this.authService.logout();
  //       return throwError(() => error);
  //     })
  //   );
  // }
}

