import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  const authService = inject(AuthService);

  const clonedReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) //original request can't be modified, so we create a clone of the request and add the Authorization header to it.
    : req;    //for login and register requests, we don't need to add the Authorization header, so we just use the original request as is.

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => { //catchError() in pipe
      if (error.status === 401) {    //if API returns a 401 Unauthorized error, we log the user out and redirect them to the login page.
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);  //for other errors, we just rethrow the error so that it can be handled by the component that made the request.s
    })
  );
};