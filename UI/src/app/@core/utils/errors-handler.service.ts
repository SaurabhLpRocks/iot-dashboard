// errors-handler.ts

import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { ErrorsService } from '../data/errors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxError } from '../../shared/interfaces/ngx-error.interface';
import { ToastNotificationService } from './toast-notification.service';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(
    // Because the ErrorHandler is created before the providers, we’ll have to use the Injector to get them.
    private injector: Injector
  ) {}

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        return this.showToast({
          error: 'Network Error!',
          message: 'Please check your internet connection and try again.'
        });
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
      const errorsService = this.injector.get(ErrorsService);
      return errorsService.log(error).then(errorWithContextInfo => {
        return this.showToast({
          error: 'App crashed!',
          message: 'Looks like app is not working as it should be, you wil be redirected to the home page.'
        });
      });
    }

    // Log the error anyway
    console.error('It happens: ', error);
  }

  private showToast(error: NgxError): void {
    const toast = this.injector.get(ToastNotificationService);
    toast.toastConfig.title = error.error;
    toast.toastConfig.body = error.message;
    toast.onError();
  }
}
