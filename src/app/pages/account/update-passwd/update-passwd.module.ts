import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UpdatePasswdPageRoutingModule } from './update-passwd-routing.module';
import { UpdatePasswdPage } from './update-passwd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePasswdPageRoutingModule
  ],
  declarations: [UpdatePasswdPage]
})
export class UpdatePasswdPageModule {}
