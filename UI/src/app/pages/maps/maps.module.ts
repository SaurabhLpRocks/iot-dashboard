import { MapsRoutingModule, routedComponents } from './maps-routing.module';

import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    SharedModule,
    ThemeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCpVhQiwAllg1RAFaxMWSpQruuGARy0Y1k',
      libraries: ['places'],
    }),
    LeafletModule.forRoot(),
    MapsRoutingModule,
    NgxEchartsModule,
  ],
  exports: [],
  declarations: [
    ...routedComponents,
  ],
})
export class MapsModule { }
