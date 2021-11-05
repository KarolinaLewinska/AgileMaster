import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherTasksPageRoutingModule } from './other-tasks-routing.module';

import { OtherTasksPage } from './other-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherTasksPageRoutingModule
  ],
  declarations: [OtherTasksPage]
})
export class OtherTasksPageModule {}
