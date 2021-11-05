import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksCategoriesPage } from './tasks-categories.page';

const routes: Routes = [
  {
    path: '',
    component: TasksCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksCategoriesPageRoutingModule {}
