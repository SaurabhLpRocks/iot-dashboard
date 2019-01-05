import { ContactsComponent } from './contacts/contacts.component';
import { DashboardComponent } from './dashboard.component';
import { ElectricityChartComponent } from './electricity/electricity-chart/electricity-chart.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { KittenComponent } from './kitten/kitten.component';
import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { PlayerComponent } from './rooms/player/player.component';
import { RoomSelectorComponent } from './rooms/room-selector/room-selector.component';
import { RoomsComponent } from './rooms/rooms.component';
import { SecurityCamerasComponent } from './security-cameras/security-cameras.component';
import { SharedModule } from '../../shared/shared.module';
import { SolarComponent } from './solar/solar.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { TeamComponent } from './team/team.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { TemperatureDraggerComponent } from './temperature/temperature-dragger/temperature-dragger.component';
import { ThemeModule } from '../../@theme/theme.module';
import { TrafficChartComponent } from './traffic/traffic-chart.component';
import { TrafficComponent } from './traffic/traffic.component';
import { WeatherComponent } from './weather/weather.component';

@NgModule({
  imports: [
    SharedModule,
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    TemperatureDraggerComponent,
    ContactsComponent,
    RoomSelectorComponent,
    TemperatureComponent,
    RoomsComponent,
    TeamComponent,
    KittenComponent,
    SecurityCamerasComponent,
    ElectricityComponent,
    ElectricityChartComponent,
    WeatherComponent,
    PlayerComponent,
    SolarComponent,
    TrafficComponent,
    TrafficChartComponent,
  ],
})
export class DashboardModule { }
