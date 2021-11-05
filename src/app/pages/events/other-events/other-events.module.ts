import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OtherEventsPageRoutingModule } from './other-events-routing.module';
import { OtherEventsPage } from './other-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherEventsPageRoutingModule
  ],
  declarations: [OtherEventsPage]
})
export class OtherEventsPageModule {}
