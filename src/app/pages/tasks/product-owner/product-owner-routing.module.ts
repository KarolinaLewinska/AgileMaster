import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductOwnerPage } from './product-owner.page';

const routes: Routes = [
  {
    path: '',
    component: ProductOwnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductOwnerPageRoutingModule {}
