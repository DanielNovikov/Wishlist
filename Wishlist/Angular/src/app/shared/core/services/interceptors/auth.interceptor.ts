import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {finalize} from "rxjs";
import {LoaderService} from "../loader.service";
import { CurrentUserService } from "../../../current-user/services/current-user.service";
import { AuthAccessTokenService } from "../../../auth/services/auth-access-token.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const loaderService = inject(LoaderService);
  loaderService.show();
  
  const authAccessTokenService = inject(AuthAccessTokenService);
  const accessToken = authAccessTokenService.value();
  
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
