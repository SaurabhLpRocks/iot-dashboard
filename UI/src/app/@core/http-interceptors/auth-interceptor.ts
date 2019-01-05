import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { NbTokenLocalStorage } from '@nebular/auth';
import { Observable } from 'rxjs';
import includes from 'lodash/includes';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorage: NbTokenLocalStorage) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let successResponse: HttpResponse<any>;
    let errorResponse: HttpErrorResponse;
    const isRequestToAuthAPI = !!(includes(req.url, '/login') || includes(req.url, '/register'));
    const addTokenToReq = !isRequestToAuthAPI;
    const token = addTokenToReq ? this.localStorage.get().toString() : '';
    const headers: HttpHeaders = addTokenToReq ? req.headers.set('Authorization', token) : <HttpHeaders>{};
    const reqUpdate: object = addTokenToReq ? { headers: headers } : {};

    // Clone the request and replace the original
    return next.handle(req.clone(reqUpdate)).pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        event => (successResponse = event instanceof HttpResponse ? event : null),
        // Operation failed; error is an HttpErrorResponse
        error => (errorResponse = error instanceof HttpErrorResponse ? error : null)
      ),
      // Handle auth errors
      finalize(() => {
        const isAuthError = errorResponse && !!(errorResponse.status === 401 || errorResponse.status === 403);
        if (isAuthError) {
          this.localStorage.clear();
          window.location.href = '#login';
        }
      })
    );
  }
}
