import { FormsRoutingModule, routedComponents } from './forms-routing.module';

import { ButtonsModule } from './buttons/buttons.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    SharedModule,
    ThemeModule,
    FormsRoutingModule,
    ButtonsModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class FormsModule { }
