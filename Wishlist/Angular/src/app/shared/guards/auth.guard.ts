import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../auth/services/auth.service";

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  
  if (authService.currentUser() === null){
    const router = inject(Router);
    await router.navigate(['/']);
  }
  
  return true;
};
