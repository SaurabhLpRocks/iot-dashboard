/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnInit } from '@angular/core';

import { AnalyticsService } from './@core/utils/analytics.service';

@Component({
  selector: 'ngx-app',
  template: '<ng-snotify class="{{style}}"></ng-snotify><router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  style = 'material';
  constructor(private analytics: AnalyticsService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
