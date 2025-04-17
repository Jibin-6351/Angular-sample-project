import { HttpInterceptorFn } from '@angular/common/http';

export const tokeninterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let token;

  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('accessToken');
  }
  const newRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return next(newRequest);
};
