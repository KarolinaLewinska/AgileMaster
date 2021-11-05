import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductOwnerPageRoutingModule } from './product-owner-routing.module';

import { ProductOwnerPage } from './product-owner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductOwnerPageRoutingModule
  ],
  declarations: [ProductOwnerPage]
})
export class ProductOwnerPageModule {}
