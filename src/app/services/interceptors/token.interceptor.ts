import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import moment from 'moment';
import { AuthService } from 'src/app/shared/service/auth.service';
import { OktaAuthService } from '@okta/okta-angular';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    public oktaAuth: OktaAuthService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getAccessToken();
    if (request.headers.get('skipAuth') && request.headers.get('skipAuth') === 'TRUE') {
      return next.handle(request);
    }

    const tokenExpiryTime:any = localStorage.getItem('tokenExpiryTime');
    const logintype = localStorage.getItem('logintype');
    const urlSegmentArr = location.pathname.split("/");
    if(moment().isAfter(tokenExpiryTime) && authToken && logintype === 'sso' && urlSegmentArr[1] != 'development') {

      this.authService.signOut();
    }

    /* NOTE:
      In GCP 'Authorization' header not accepted it gives 401 error for svg icons
    | hence we are not adding Authorization for svg icons url
    */
    const lastSegment = request.url.split('/').pop();
    const fileExtension = lastSegment.split('.');

    if(fileExtension.length < 2 && fileExtension[1] != 'svg') {

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
          'Strict-Transport-Security': "max-age=63072000; includeSubDomains; preload",
          'Content-Security-Policy': "'default-src' self",
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let data: { reason?: string; status?: number; } = {};
        data = {
          reason: error && error.error && error.error.reason ? error.error.reason : '',
          status: error.status
        };
        // token is expired get new token and try again
        if (data.status === 401 && urlSegmentArr[1] != 'development') {
          // this.handleUnauthorized(request, next);
          return this._ifTokenExpired().pipe(
            switchMap(() => {
              return next.handle(this.updateHeader(request));
            })
          );
        } else {
          // return next.handle(request);
          return throwError(error);
        }
      })
    );
  }

  private _refreshSubject: Subject<any> = new Subject<any>();

  private _ifTokenExpired() {

    this._refreshSubject.subscribe({
      complete: () => {
        this._refreshSubject = new Subject<any>();
      }
    });
    if (this._refreshSubject.observers.length === 1) {
      this.authService.handleUnauthorized();
    }

    return this._refreshSubject;
  }

  updateHeader(request) {

    const authToken = this.authService.getAccessToken();

    /* NOTE:
      In GCP 'Authorization' header not accepted it gives 401 error for svg icons
    | hence we are not adding Authorization for svg icons url
    */
    const lastSegment = request.url.split('/').pop();
    const fileExtension = lastSegment.split('.');

    if(fileExtension.length < 2 && fileExtension[1] != 'svg') {

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
          'Strict-Transport-Security': "max-age=63072000; includeSubDomains; preload",
          'Content-Security-Policy': "'default-src' self",
        }
      });
    }

    return request;
  }
}

