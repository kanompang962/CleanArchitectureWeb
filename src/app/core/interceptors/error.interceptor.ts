import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {
        localStorage.removeItem('access_token');
        router.navigate(['/auth/login']);
      }

      if (error.status === 403) {
        alert('You do not have permission to access this resource');
      }

      if (error.status >= 500) {
        alert('Server error, please try again later');
      }

      return throwError(() => error);
    })
  );
};