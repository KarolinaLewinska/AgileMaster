import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalystsPageRoutingModule } from './analysts-routing.module';

import { AnalystsPage } from './analysts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalystsPageRoutingModule
  ],
  declarations: [AnalystsPage]
})
export class AnalystsPageModule {}
