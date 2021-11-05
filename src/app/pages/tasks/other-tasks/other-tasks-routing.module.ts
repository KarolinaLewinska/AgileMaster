import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherTasksPage } from './other-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: OtherTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherTasksPageRoutingModule {}
