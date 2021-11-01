import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePasswdPage } from './update-passwd.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePasswdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePasswdPageRoutingModule {}
