import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsCategoriesPage } from './events-categories.page';

const routes: Routes = [
  {
    path: '',
    component: EventsCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsCategoriesPageRoutingModule {}
