import { HttpRequest, HttpHandlerFn, HttpInterceptorFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

export const loaderInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const loaderService = inject(LoaderService);

  loaderService.show();

  return next(req).pipe(
    finalize(() => {
      setTimeout(() => {
        loaderService.hide()
      }, 600); // Adicionar atraso para simular o carregamento
    })
  );
};