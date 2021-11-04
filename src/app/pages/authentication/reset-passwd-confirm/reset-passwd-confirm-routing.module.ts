import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetPasswdConfirmPage } from './reset-passwd-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswdConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswdConfirmPageRoutingModule {}
