import { Injectable, OnInit } from '@angular/core';
import { SnotifyPosition, SnotifyService, SnotifyToast, SnotifyToastConfig } from 'ng-snotify';

import { Observable } from 'rxjs';

@Injectable()
export class ToastNotificationService implements OnInit {
  toast: SnotifyToast;
  toastConfig: ToastNotificationConfigs;
  confirmBox: Observable<any>;
  constructor(public snotifyService: SnotifyService) {
    this.toastConfig = {
      title: '',
      body: '',
      timeout: 10000,
      closeOnClick: true,
      pauseOnHover: true,
      titleMaxLength: 20,
      bodyMaxLength: 200,
      position: SnotifyPosition.rightBottom,
      backdrop: -1,
      showProgressBar: true,
      newTop: true,
      maxAtPosition: 5,
      maxOnScreen: 5
    };
  }

  ngOnInit() {
    this.setDefaults();

    this.toast.on('mounted', t => {
      // tslint:disable-next-line:no-console
      console.log('mounted', t);
    });

    this.toast.on('beforeShow', t => {
      // tslint:disable-next-line:no-console
      console.log('beforeShow', t);
    });

    this.toast.on('shown', t => {
      // tslint:disable-next-line:no-console
      console.log('shown', t);
    });

    this.toast.on('input', t => {
      // tslint:disable-next-line:no-console
      console.log('input', t);
    });

    this.toast.on('click', t => {
      // tslint:disable-next-line:no-console
      console.log('click', t);
    });

    this.toast.on('mouseenter', t => {
      // tslint:disable-next-line:no-console
      console.log('mouseenter', t);
    });

    this.toast.on('mouseleave', t => {
      // tslint:disable-next-line:no-console
      console.log('mouseleave', t);
    });

    this.toast.on('beforeHide', t => {
      // tslint:disable-next-line:no-console
      console.log('beforeHide', t);
    });

    this.toast.on('hidden', t => {
      // tslint:disable-next-line:no-console
      console.log('hidden', t);
    });

    this.toast.on('destroyed', t => {
      // tslint:disable-next-line:no-console
      console.log('destroyed', t);
    });
  }

  setDefaults() {
    const defaults = {
      global: {
        newOnTop: this.toastConfig.newTop,
        maxAtPosition: this.toastConfig.maxAtPosition,
        maxOnScreen: this.toastConfig.maxOnScreen
      },
      toast: {
        bodyMaxLength: this.toastConfig.bodyMaxLength,
        titleMaxLength: this.toastConfig.titleMaxLength,
        backdrop: this.toastConfig.backdrop,
        position: this.toastConfig.position,
        timeout: this.toastConfig.timeout,
        showProgressBar: this.toastConfig.showProgressBar,
        closeOnClick: this.toastConfig.closeOnClick,
        pauseOnHover: this.toastConfig.pauseOnHover
      }
    };

    this.snotifyService.setDefaults(defaults);
    return defaults;
  }

  getToastConfig(): SnotifyToastConfig {
    return this.setDefaults().toast;
  }

  onSuccess() {
    this.snotifyService.success(this.toastConfig.title, this.toastConfig.body, this.getToastConfig());
  }
  onInfo() {
    this.snotifyService.info(this.toastConfig.title, this.toastConfig.body, this.getToastConfig());
  }
  onError() {
    this.snotifyService.error(this.toastConfig.body, this.toastConfig.title, this.getToastConfig());
  }
  onWarning() {
    this.snotifyService.warning(this.toastConfig.title, this.toastConfig.body, this.getToastConfig());
  }
  onSimple() {
    this.setDefaults();

    // const icon = `assets/custom-svg.svg`;
    const icon = `https://placehold.it/48x100`;

    this.snotifyService.simple(this.toastConfig.title, this.toastConfig.body, this.getToastConfig());
  }

  onAsyncLoading(observable: Observable<any>) {
    this.setDefaults();
    const toast = this.snotifyService.async(
      this.toastConfig.title,
      this.toastConfig.body,
      /*
      You should pass Promise or Observable of type SnotifyConfig to change some data or do some other actions
      More information how to work with observables:
      https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/create.md
       */

      // new Promise((resolve, reject) => {
      //   setTimeout(() => reject(), 1000);
      //   setTimeout(() => resolve(), 1500);
      // })
      Observable.create(observer => {
        observer.next({
          body: 'Processing...'
        });
        observable.subscribe(
          (success: any) => observer.complete(),
          (error: any) => observer.complete(),
          () => {
            setTimeout(() => {
              observer.complete();
              this.snotifyService.remove(toast.id);
            }, 1000);
          }
        );
      })
    );
  }

  onConfirmation() {
    this.confirmBox = new Observable(observer => {
      this.setDefaults();
      /*
         Here we pass an buttons array, which contains of 2 element of type SnotifyButton
          */
      const toast = this.snotifyService.confirm(this.toastConfig.title, this.toastConfig.body, {
        timeout: this.toastConfig.timeout,
        showProgressBar: this.toastConfig.showProgressBar,
        closeOnClick: this.toastConfig.closeOnClick,
        pauseOnHover: this.toastConfig.pauseOnHover,
        buttons: [
          // tslint:disable-next-line:no-console
          {
            text: 'Yes',
            action: () => {
              observer.next();
              this.snotifyService.remove(toast.id);
            },
            bold: false
          },
          // tslint:disable-next-line:max-line-length
          // tslint:disable-next-line:no-console
          {
            text: 'No',
            action: () => {
              observer.error();
              this.snotifyService.remove(toast.id);
            },
            bold: true
          }
        ]
      });
    });
  }

  onPrompt() {
    this.setDefaults();
    /*
     Here we pass an buttons array, which contains of 2 element of type SnotifyButton
     At the action of the first button we can get what user entered into input field.
     At the second we can't get it. But we can remove this toast
     */
    const toast = this.snotifyService.prompt(this.toastConfig.title, this.toastConfig.body, {
      timeout: this.toastConfig.timeout,
      showProgressBar: this.toastConfig.showProgressBar,
      closeOnClick: this.toastConfig.closeOnClick,
      pauseOnHover: this.toastConfig.pauseOnHover,
      buttons: [
        // tslint:disable-next-line:no-console
        { text: 'Yes', action: text => console.log(`Said Yes: ${text}`) },
        // tslint:disable-next-line:no-console
        {
          text: 'No',
          action: text => {
            // tslint:disable-next-line:no-console
            console.log(`Said No: ${text}`);
            this.snotifyService.remove(toast.id);
          }
        }
      ],
      placeholder: 'This is the example placeholder which you can pass' // Max-length = 40
    });
  }

  onClear() {
    this.snotifyService.clear();
  }
}

export interface ToastNotificationConfigs {
  // Toast configs
  title?: string;
  body?: string;
  timeout?: number;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  titleMaxLength?: number;
  bodyMaxLength?: number;
  position?: SnotifyPosition;
  backdrop?: number;
  showProgressBar?: boolean;

  // Global configs
  newTop?: boolean;
  maxAtPosition?: number;
  maxOnScreen?: number;
}
