import { TablesRoutingModule, routedComponents } from './tables-routing.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    SharedModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    SmartTableService,
  ],
})
export class TablesModule { }
