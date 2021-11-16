import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProjectsTeamsStatisticsPageRoutingModule } from './projects-teams-statistics-routing.module';
import { ProjectsTeamsStatisticsPage } from './projects-teams-statistics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectsTeamsStatisticsPageRoutingModule
  ],
  declarations: [ProjectsTeamsStatisticsPage]
})
export class ProjectsTeamsStatisticsPageModule {}
