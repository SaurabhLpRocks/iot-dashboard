import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import {
  NgxPopoverCardComponent,
  NgxPopoverFormComponent,
  NgxPopoverTabsComponent,
} from './popovers/popover-examples.component';

import { DialogComponent } from './dialog/dialog.component';
import { DialogNamePromptComponent } from './dialog/dialog-name-prompt/dialog-name-prompt.component';
import { ModalOverlaysComponent } from './modal-overlays.component';
import { ModalOverlaysRoutingModule } from './modal-overlays-routing.module';
import { NgModule } from '@angular/core';
import { PopoversComponent } from './popovers/popovers.component';
import { SharedModule } from '../../shared/shared.module';
import { ShowcaseDialogComponent } from './dialog/showcase-dialog/showcase-dialog.component';
import { ThemeModule } from '../../@theme/theme.module';
import { ToastrComponent } from './toastr/toastr.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { WindowComponent } from './window/window.component';
import { WindowFormComponent } from './window/window-form/window-form.component';

// modules



// components














const COMPONENTS = [
  ModalOverlaysComponent,
  ToastrComponent,
  DialogComponent,
  ShowcaseDialogComponent,
  DialogNamePromptComponent,
  WindowComponent,
  WindowFormComponent,
  PopoversComponent,
  NgxPopoverCardComponent,
  NgxPopoverFormComponent,
  NgxPopoverTabsComponent,
  TooltipComponent,
];

const ENTRY_COMPONENTS = [
  ShowcaseDialogComponent,
  DialogNamePromptComponent,
  WindowFormComponent,
  NgxPopoverCardComponent,
  NgxPopoverFormComponent,
  NgxPopoverTabsComponent,
];

const MODULES = [
  SharedModule,
  ThemeModule,
  ModalOverlaysRoutingModule,
  NbDialogModule.forChild(),
  NbWindowModule.forChild(),
];

const SERVICES = [
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
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class ModalOverlaysModule {
}
