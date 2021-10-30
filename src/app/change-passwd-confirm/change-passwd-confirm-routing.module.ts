import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePasswdConfirmPage } from './change-passwd-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswdConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePasswdConfirmPageRoutingModule {}
