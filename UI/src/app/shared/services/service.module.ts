import { ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HelperService } from './helper.service';

const SERVICES = [HelperService];

@NgModule({
  imports: [CommonModule],
  providers: [...SERVICES],
})
export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ServiceModule,
      providers: [...SERVICES],
    };
  }
}
