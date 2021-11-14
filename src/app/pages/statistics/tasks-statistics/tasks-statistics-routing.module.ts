import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksStatisticsPage } from './tasks-statistics.page';

const routes: Routes = [
  {
    path: '',
    component: TasksStatisticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksStatisticsPageRoutingModule {}
