import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticsCategoriesPageRoutingModule } from './statistics-categories-routing.module';

import { StatisticsCategoriesPage } from './statistics-categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticsCategoriesPageRoutingModule
  ],
  declarations: [StatisticsCategoriesPage]
})
export class StatisticsCategoriesPageModule {}
