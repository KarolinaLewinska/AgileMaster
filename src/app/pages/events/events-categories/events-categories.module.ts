import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventsCategoriesPageRoutingModule } from './events-categories-routing.module';
import { EventsCategoriesPage } from './events-categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsCategoriesPageRoutingModule
  ],
  declarations: [EventsCategoriesPage]
})
export class EventsCategoriesPageModule {}
