import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsCategoriesPage } from './statistics-categories.page';

const routes: Routes = [
  {
    path: '',
    component: StatisticsCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsCategoriesPageRoutingModule {}
