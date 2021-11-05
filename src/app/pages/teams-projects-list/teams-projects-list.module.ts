import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamsProjectsListPageRoutingModule } from './teams-projects-list-routing.module';

import { TeamsProjectsListPage } from './teams-projects-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamsProjectsListPageRoutingModule
  ],
  declarations: [TeamsProjectsListPage]
})
export class TeamsProjectsListPageModule {}
