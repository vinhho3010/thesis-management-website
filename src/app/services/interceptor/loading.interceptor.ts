import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { LoaderService } from '../loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(
    private loadingService: LoaderService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('caught')
    this.totalRequests++;
    this.loadingService.setLoading(true);

    const loadingTimeout = timer(200); // 0.2 seconds

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          loadingTimeout.pipe(takeUntil(next.handle(request))).subscribe(() => {
            this.loadingService.setLoading(false);
          });
        }
      })
    );
  }
}
