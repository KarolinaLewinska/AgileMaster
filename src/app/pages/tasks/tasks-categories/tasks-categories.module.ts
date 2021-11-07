import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TasksCategoriesPageRoutingModule } from './tasks-categories-routing.module';
import { TasksCategoriesPage } from './tasks-categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksCategoriesPageRoutingModule
  ],
  declarations: [TasksCategoriesPage]
})
export class TasksCategoriesPageModule {}
