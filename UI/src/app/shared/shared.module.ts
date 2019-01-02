import {
  CapitalizePipe,
  EvaIconsPipe,
  NumberWithCommasPipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
} from './pipes';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MyComponentComponent } from './components';
import { ServiceModule } from './services/service.module';

const BASE_MODULES = [CommonModule];

const COMPONENTS = [MyComponentComponent];

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
  EvaIconsPipe,
];

const NB_SHARED_PROVIDERS = [
    ...ServiceModule.forRoot().providers,
];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [...BASE_MODULES],
  exports: [...BASE_MODULES, ...COMPONENTS, ...PIPES],
  entryComponents: [],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
          ngModule: SharedModule,
          providers: [...NB_SHARED_PROVIDERS],
        };
      }
}
