import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const reqConKey = req.clone({
    setParams: { api_key: environment.apiKey }
  });

  return next(reqConKey);
};