import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

export const loginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('accessToken');
  }

  if (token) {
    return true;
  }

  return router.navigate(['/signin']);
};
