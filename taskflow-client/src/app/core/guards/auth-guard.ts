import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn()) {
    return true;
  }

  localStorage.removeItem('token'); //clear expired token
  router.navigate(['/login'], 
    { queryParams: { returnUrl: state.url } }); //capture the return url for redirect after login,optional
  return false;
};