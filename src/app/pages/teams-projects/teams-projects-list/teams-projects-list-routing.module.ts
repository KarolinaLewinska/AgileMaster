import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamsProjectsListPage } from './teams-projects-list.page';

const routes: Routes = [
  {
    path: '',
    component: TeamsProjectsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsProjectsListPageRoutingModule {}
