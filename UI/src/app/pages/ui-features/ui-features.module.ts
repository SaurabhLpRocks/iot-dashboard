import { GridComponent } from './grid/grid.component';
import { IconsComponent } from './icons/icons.component';
import { NgModule } from '@angular/core';
import { SearchComponent } from './search-fields/search-fields.component';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { TypographyComponent } from './typography/typography.component';
import { UiFeaturesComponent } from './ui-features.component';
import { UiFeaturesRoutingModule } from './ui-features-routing.module';

const components = [
  UiFeaturesComponent,
  GridComponent,
  IconsComponent,
  TypographyComponent,
  SearchComponent,
];

@NgModule({
  imports: [
    SharedModule,
    ThemeModule,
    UiFeaturesRoutingModule,
  ],
  declarations: [
    ...components,
  ],
})
export class UiFeaturesModule { }
