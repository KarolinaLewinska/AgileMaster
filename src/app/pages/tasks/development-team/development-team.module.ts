import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevelopmentTeamPageRoutingModule } from './development-team-routing.module';

import { DevelopmentTeamPage } from './development-team.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevelopmentTeamPageRoutingModule
  ],
  declarations: [DevelopmentTeamPage]
})
export class DevelopmentTeamPageModule {}
