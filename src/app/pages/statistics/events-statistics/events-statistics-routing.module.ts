import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsStatisticsPage } from './events-statistics.page';

const routes: Routes = [
  {
    path: '',
    component: EventsStatisticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsStatisticsPageRoutingModule {}
