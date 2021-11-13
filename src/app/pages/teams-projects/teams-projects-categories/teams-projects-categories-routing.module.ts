import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamsProjectsCategoriesPage } from './teams-projects-categories.page';

const routes: Routes = [
  {
    path: '',
    component: TeamsProjectsCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsProjectsCategoriesPageRoutingModule {}
