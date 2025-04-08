import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const tokeninterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  let token;

  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('accessToken');
  }
  const newRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(newRequest);
};
