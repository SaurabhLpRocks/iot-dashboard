import { AbstractControl, FormGroup } from '@angular/forms';

import { Injectable } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { User } from '../interfaces/user.interface';
import { appVariables } from '../constants/app.constants';
import { environment } from '../../../environments';
import { userRoleDefaultPages } from '../constants/default-pagest.constants';
import { validationMessages } from '../constants/validation-messages.contants';

function getWindow(): any {
  return window;
}

@Injectable()
export class HelperService {
  shouldAddContentTypeHeader: boolean = true;
  tickerInstance: any = null;
  env: string;
  // resourceActionAccessMap: ResourceActionAccess[];
  constructor(public slimLoadingBarService: SlimLoadingBarService) {
    this.env = environment.env;
  }

  // return the global window object
  get nativeWindow(): any {
    return getWindow();
  }

  isProdEnv(): boolean {
    return this.env.toLocaleLowerCase() === 'prod' ||
      this.env.toLocaleLowerCase() === 'production'
      ? true
      : false;
  }
  isStageEnv(): boolean {
    return this.env.toLocaleLowerCase() === 'stage' ||
      this.env.toLocaleLowerCase() === 'staging'
      ? true
      : false;
  }
  isDevEnv(): boolean {
    return this.env.toLocaleLowerCase() === 'dev' ||
      this.env.toLocaleLowerCase() === 'development'
      ? true
      : false;
  }

  /**
   * Use this method to create logs to the server
   * Pass info like error stack (if error), user info, user brower and other details
   */
  serverLogger(log: any) {
    // tslint:disable-next-line:no-console
    console.log(log);
  }

  secondsTicksCounter(): object {
    let seconds: number = 0;
    return {
      start: () => {
        return setInterval(function() {
          seconds++;
        }, 1000);
      },
      stop: (intervalInstance: any) => {
        clearInterval(intervalInstance);
        return seconds;
      },
      intervalInstance: null,
    };
  }

  deleteAllCookies(): void {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  }

  getUserFromLocalStorage(): User {
    const user = localStorage.getItem(appVariables.userLocalStorage);
    return <User>JSON.parse(user);
  }

  getUserRole(): string {
    const user: User = this.getUserFromLocalStorage();
    return user ? user.roleNames[0] : null;
  }

  isUserLoggedIn(): boolean {
    const user = localStorage.getItem(appVariables.userLocalStorage);
    return user && user.length > 0 ? true : false;
  }

  getUserDefaultPageUrl(): string {
    const role: string = this.getUserRole();
    const defaultPage = userRoleDefaultPages[role];
    return defaultPage;
  }

  initFormControls(
    self: object,
    formGroup: FormGroup,
    controlNames: string[],
  ): void {
    for (const controlName of controlNames) {
      self[controlName] = formGroup.controls[controlName];
    }
  }

  getInputValidationClass(
    formGroup: FormGroup,
    formControlName: string,
  ): string {
    if (formGroup) {
      const formControl: AbstractControl = formGroup.controls[formControlName];
      if (formControl && formControl.touched) {
        return formControl.valid
          ? appVariables.successInputClass
          : appVariables.errorInputClass;
      }
    }
    return '';
  }

  getConfirmInputValidationClass(
    compareFromGroup: FormGroup,
    formControl: AbstractControl,
    confirmFormControl: AbstractControl,
  ): string {
    if (
      (formControl && formControl.touched) ||
      (confirmFormControl && confirmFormControl.touched)
    ) {
      return compareFromGroup.valid
        ? appVariables.successInputClass
        : appVariables.errorInputClass;
    }
    if (formControl && formControl.touched) {
      return formControl.valid
        ? appVariables.successInputClass
        : appVariables.errorInputClass;
    } else {
      return '';
    }
  }

  showCompareCtrlsValidationMsg(
    frmGroup: FormGroup,
    ctrl1: AbstractControl,
  ): boolean {
    return frmGroup && !frmGroup.valid && (ctrl1.touched || ctrl1.touched)
      ? true
      : false;
  }

  showCtrlValidationMsg(formControl: AbstractControl): boolean {
    return formControl &&
      !formControl.valid &&
      formControl.touched &&
      formControl.errors
      ? true
      : false;
  }
  getCtrlValidationMsg(formGroup: FormGroup, ctrlName: string): string {
    if (formGroup) {
      const formControl: AbstractControl = formGroup.controls[ctrlName];
      if (formControl && formControl.errors) {
        const errors = formControl.errors;
        if (errors.required) {
          return validationMessages[ctrlName].required;
        } else if (errors.minlength && errors.minlength.requiredLength) {
          return validationMessages[ctrlName].minLength(
            errors.minlength.requiredLength,
          );
        } else if (errors.maxlength && errors.maxlength.requiredLength) {
          return validationMessages[ctrlName].maxLength(
            errors.maxlength.requiredLength,
          );
        } else if (errors.digitsOnly && !errors.digitsOnly.valid) {
          return validationMessages[ctrlName].digitsOnly();
        } else if (errors.validateEmail && !errors.validateEmail.valid) {
          return validationMessages[ctrlName].invalid();
        }
      }
    }

    return null;
  }

  getFormGroupCtrlValidationMsg(frmGroup: FormGroup, ctrlName: string): string {
    if (frmGroup && frmGroup.errors) {
      const errors = frmGroup.errors;
      if (errors.equal && !errors.equal.valid) {
        return validationMessages[ctrlName].equal;
      }
    }
  }

  startLoader(delay?: number): void {
    delay = delay || typeof delay === 'number' ? delay : 0;
    setTimeout(() => {
      this.slimLoadingBarService.start(() => {
        // Loading Completed;
      });
    }, delay);
  }

  stopLoader(delay?: number): void {
    delay = delay || typeof delay === 'number' ? delay : 0;
    setTimeout(() => {
      this.slimLoadingBarService.complete();
    }, delay);
  }

  getObjectKeys(object: {}): string[] {
    if (!object || typeof object !== 'object') {
      throw new Error(
        'Only objects can be passed to retrieve its own enumerable properties(keys).',
      );
    }
    return Object.keys(object);
  }

  signOutUser() {
    localStorage.clear();
    window.location.href = appVariables.loginPageUrl;
  }
}
