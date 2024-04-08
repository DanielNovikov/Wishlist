import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../../../auth/services/auth.service";
import {finalize} from "rxjs";
import {LoaderService} from "../loader.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const loaderService = inject(LoaderService);
  loaderService.show();
  
  const authService = inject(AuthService);
  const accessToken = authService.accessToken();
  
  if (accessToken === null) {
    return next(req).pipe(
        finalize(() => loaderService.hide())
    );
  }
  
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  
  return next(authReq).pipe(
      finalize(() => loaderService.hide())
  );
};
