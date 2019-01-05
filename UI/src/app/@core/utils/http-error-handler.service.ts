import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { NgxError } from '../../shared/interfaces/ngx-error.interface';
import { ServerResponse } from '../../shared/interfaces/server-response';
import { ToastNotificationService } from './toast-notification.service';
import { appVariables } from '../../shared/constants/app.constants';
import { throwError } from 'rxjs';

@Injectable()
export class HttpErrorHandlerService {
  constructor(public toast: ToastNotificationService) {}

  /**
   * Handles the error response when the API returns error status code i.e. non 200 status code.
   *
   * @param {HttpErrorResponse} error
   * @returns
   * @memberof ErrorHandlerService
   */
  handleErrorResponse(error: HttpErrorResponse) {
    const parsedError = this.tryParseError(error.error);
    this.showToast(parsedError);
    return throwError(parsedError.error);
  }

  /**
   * Hadles the server response which returns the status code 200 but has
   * "error" or "warning" in the success response body.
   *
   * @param {ServerResponse} error
   * @returns
   * @memberof ErrorHandlerService
   */
  handleCustomServerError(errorRes: HttpResponse<ServerResponse>) {
    const error = errorRes.body;
    const parsedError = this.parseCustomServerError(error);
    this.showToast(parsedError);
    // Don't throw error for the warning
    return error.warning && !error.error ? errorRes : throwError(parsedError.message);
  }

  private tryParseError(error: NgxError | string): NgxError {
    try {
      if (typeof error === 'object') {
        return {
          error: error.error || appVariables.defaultServerError.error,
          message: error.message || appVariables.defaultServerError.message,
        };
      }
    } catch (ex) {
      return new NgxError();
    }
    return new NgxError();
  }

  private parseCustomServerError = (error: ServerResponse) => ({
    error: error.error && !error.warning ? error.error : appVariables.defaultServerError.error,
    warning: error.warning ? error.warning : null,
    message: error.message || appVariables.defaultServerError.message,
  })

  private showToast(parsedError: NgxError): void {
    this.toast.toastConfig.title = parsedError.error;
    this.toast.toastConfig.body = parsedError.message;
    parsedError.warning ? this.toast.onWarning() : this.toast.onError();
  }
}
