import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { of, from, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {

  private readonly auth: AuthService;

  constructor(auth: AuthService) {
    if (!auth) {
      throw new Error('[AuthErrorInterceptor]: AuthService must be provided');
    }

    this.auth = auth;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(e => {

        if (e instanceof HttpErrorResponse) {
          if ([401, 403].indexOf(e.status) !== -1) {
            this.auth.logout();
            return of(e) as Observable<never>; // this way, user doesn't see errors on screen
          }
        }

        return throwError(e);
    }));
  }

}
