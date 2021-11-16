import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventsStatisticsPageRoutingModule } from './events-statistics-routing.module';
import { EventsStatisticsPage } from './events-statistics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsStatisticsPageRoutingModule
  ],
  declarations: [EventsStatisticsPage]
})
export class EventsStatisticsPageModule {}
