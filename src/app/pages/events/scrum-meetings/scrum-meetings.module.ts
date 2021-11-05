import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScrumMeetingsPageRoutingModule } from './scrum-meetings-routing.module';
import { ScrumMeetingsPage } from './scrum-meetings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScrumMeetingsPageRoutingModule
  ],
  declarations: [ScrumMeetingsPage]
})
export class ScrumMeetingsPageModule {}
