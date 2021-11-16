import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TasksStatisticsPageRoutingModule } from './tasks-statistics-routing.module';
import { TasksStatisticsPage } from './tasks-statistics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksStatisticsPageRoutingModule
  ],
  declarations: [TasksStatisticsPage]
})
export class TasksStatisticsPageModule {}
