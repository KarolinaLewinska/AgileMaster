import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtherEventsPage } from './other-events.page';

const routes: Routes = [
  {
    path: '',
    component: OtherEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherEventsPageRoutingModule {}
