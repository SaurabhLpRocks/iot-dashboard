import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { HttpErrorHandlerService } from '../utils/http-error-handler.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorHandler: HttpErrorHandlerService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            if (typeof event.body === 'object' && event.body.error) {
              return this.errorHandler.handleCustomServerError(event);
            }
            return event;
          }
          return null;
        },
        // Operation failed; error is an HttpErrorResponse
        error => this.errorHandler.handleErrorResponse(error)
      )
      // Log when response observable either completes or errors
      //   finalize(() => {
      //     const isErrorResponse = errorResponse instanceof HttpErrorResponse;
      //     console.log('2. isErrorResponse ', isErrorResponse);
      //     console.log('2. errorResponse ', errorResponse);
      //   })
    );
  }
}
