import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswdConfirmPageRoutingModule } from './reset-passwd-confirm-routing.module';

import { ResetPasswdConfirmPage } from './reset-passwd-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswdConfirmPageRoutingModule
  ],
  declarations: [ResetPasswdConfirmPage]
})
export class ResetPasswdConfirmPageModule {}
