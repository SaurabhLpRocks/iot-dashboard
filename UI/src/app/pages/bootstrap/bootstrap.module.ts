import { BootstrapComponent } from './bootstrap.component';
import { BootstrapRoutingModule } from './bootstrap-routing.module';
import { ButtonsModule } from './buttons/buttons.module';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { ModalComponent } from './modals/modal/modal.component';
import { ModalsComponent } from './modals/modals.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';

const COMPONENTS = [
  BootstrapComponent,
  ModalsComponent,
  ModalComponent,
  FormInputsComponent,
];

const ENTRY_COMPONENTS = [
  ModalComponent,
];

@NgModule({
  imports: [
    SharedModule,
    ThemeModule,
    BootstrapRoutingModule,
    ButtonsModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class BootstrapModule { }
