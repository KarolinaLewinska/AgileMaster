import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TeamsProjectsCategoriesPageRoutingModule } from './teams-projects-categories-routing.module';
import { TeamsProjectsCategoriesPage } from './teams-projects-categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamsProjectsCategoriesPageRoutingModule
  ],
  declarations: [TeamsProjectsCategoriesPage]
})
export class TeamsProjectsCategoriesPageModule {}
