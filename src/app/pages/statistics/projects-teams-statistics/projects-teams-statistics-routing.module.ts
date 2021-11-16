import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsTeamsStatisticsPage } from './projects-teams-statistics.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectsTeamsStatisticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsTeamsStatisticsPageRoutingModule {}
