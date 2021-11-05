import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevelopmentTeamPage } from './development-team.page';

const routes: Routes = [
  {
    path: '',
    component: DevelopmentTeamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevelopmentTeamPageRoutingModule {}
