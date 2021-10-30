import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePasswdConfirmPageRoutingModule } from './change-passwd-confirm-routing.module';

import { ChangePasswdConfirmPage } from './change-passwd-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePasswdConfirmPageRoutingModule
  ],
  declarations: [ChangePasswdConfirmPage]
})
export class ChangePasswdConfirmPageModule {}
