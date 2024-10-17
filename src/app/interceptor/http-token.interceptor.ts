import { HttpInterceptorFn } from '@angular/common/http';
import {TokenService} from '../services/token/token.service';
import {inject} from '@angular/core';


export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  const token = tokenService.token;

  const authReq = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    : req;

  // Pass the cloned request to the next handler
  return next(authReq);
};
