import { Tab1Component, Tab2Component, TabsComponent } from './tabs/tabs.component';

import { AccordionComponent } from './accordion/accordion.component';
import { AlertComponent } from './alert/alert.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarKitFullCalendarShowcaseComponent } from './calendar-kit/calendar-kit.component';
import { CalendarKitMonthCellComponent } from './calendar-kit/month-cell/month-cell.component';
import { ChatComponent } from './chat/chat.component';
import { DayCellComponent } from './calendar/day-cell/day-cell.component';
import { ExtraComponentsComponent } from './extra-components.component';
import { ExtraComponentsRoutingModule } from './extra-components-routing.module';
import { InfiniteListComponent } from './infinite-list/infinite-list.component';
import {
  InteractiveProgressBarComponent,
} from './progress-bar/interactive-progress-bar/interactive-progress-bar.component';
import { ListComponent } from './list/list.component';
import { NebularFormInputsComponent } from './form-inputs/nebular-form-inputs.component';
import { NebularSelectComponent } from './form-inputs/nebular-select/nebular-select.component';
import { NewsPostComponent } from './infinite-list/news-post/news-post.component';
import { NewsPostPlaceholderComponent } from './infinite-list/news-post-placeholder/news-post-placeholder.component';
import { NewsService } from './services/news.service';
import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { SharedModule } from '../../shared/shared.module';
import { SpinnerColorComponent } from './spinner/spinner-color/spinner-color.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerInButtonsComponent } from './spinner/spinner-in-buttons/spinner-in-buttons.component';
import { SpinnerInTabsComponent } from './spinner/spinner-in-tabs/spinner-in-tabs.component';
import { SpinnerSizesComponent } from './spinner/spinner-sizes/spinner-sizes.component';
import { StepperComponent } from './stepper/stepper.component';
import { ThemeModule } from '../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { TreeComponent } from './tree/tree.component';
import { TreeModule } from 'angular-tree-component';

// components

























// service



const COMPONENTS = [
  ExtraComponentsComponent,
  TreeComponent,
  AlertComponent,
  ProgressBarComponent,
  InteractiveProgressBarComponent,
  SpinnerComponent,
  SpinnerColorComponent,
  SpinnerSizesComponent,
  SpinnerInButtonsComponent,
  SpinnerInTabsComponent,
  CalendarComponent,
  DayCellComponent,
  ChatComponent,
  TabsComponent,
  Tab1Component,
  Tab2Component,
  StepperComponent,
  ListComponent,
  InfiniteListComponent,
  NewsPostComponent,
  NewsPostPlaceholderComponent,
  AccordionComponent,
  NebularFormInputsComponent,
  NebularSelectComponent,
  CalendarKitFullCalendarShowcaseComponent,
  CalendarKitMonthCellComponent,
];

const SERVICES = [
  NewsService,
];

const MODULES = [
  SharedModule,
  ThemeModule,
  ExtraComponentsRoutingModule,
  TreeModule,
  ToasterModule.forRoot(),
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class ExtraComponentsModule { }
