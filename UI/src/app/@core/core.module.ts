import { ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import {
  NbAuthJWTToken,
  NbAuthModule,
  NbDummyAuthStrategy,
  NbPasswordAuthStrategy,
  NbTokenLocalStorage,
  NbTokenStorage
} from '@nebular/auth';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import { AnalyticsService } from './utils/analytics.service';
import { AuthGuard } from './utils/auth-guard.service';
import { CommonModule } from '@angular/common';
import { DataModule } from './data/data.module';
import { ErrorsHandler } from './utils/errors-handler.service';
import { ErrorsService } from './data/errors.service';
import { HttpErrorHandlerService } from './utils/http-error-handler.service';
import { ToastNotificationService } from './utils/toast-notification.service';
import { httpInterceptorProviders } from './http-interceptors';
import { of as observableOf } from 'rxjs';
import { throwIfAlreadyLoaded } from './module-import-guard';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'socicon-github'
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'socicon-facebook'
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'socicon-twitter'
  }
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

const formSetting: any = {
  redirectDelay: 500,
  strategy: 'email',
  showMessages: {
    success: true,
    error: true
  },
  terms: true,
  socialLinks: socialLinks
};

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: 'http://localhost:5000',
        token: {
          class: NbAuthJWTToken,
          key: 'token' // this parameter tells where to look for the token
        },
        login: {
          // ...
          endpoint: '/users/login',
          method: 'post'
        },
        register: {
          // ...
          endpoint: '/users',
          method: 'post'
        }
      })
    ],
    forms: {
      login: formSetting,
      register: formSetting
    }
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*'
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*'
      }
    }
  }).providers,

  {
    provide: NbRoleProvider,
    useClass: NbSimpleRoleProvider
  },
  NbTokenLocalStorage,
  AnalyticsService,
  AuthGuard,
  {
    provide: ErrorHandler,
    useClass: ErrorsHandler
  },
  ErrorsService,
  HttpErrorHandlerService,
  ToastNotificationService
];

@NgModule({
  imports: [CommonModule],
  exports: [NbAuthModule],
  declarations: [],
  providers: [httpInterceptorProviders]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [...NB_CORE_PROVIDERS]
    };
  }
}
