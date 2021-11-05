import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalystsPage } from './analysts.page';

const routes: Routes = [
  {
    path: '',
    component: AnalystsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalystsPageRoutingModule {}
