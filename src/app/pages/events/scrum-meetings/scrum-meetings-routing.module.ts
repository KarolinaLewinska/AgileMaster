import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScrumMeetingsPage } from './scrum-meetings.page';

const routes: Routes = [
  {
    path: '',
    component: ScrumMeetingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScrumMeetingsPageRoutingModule {}
