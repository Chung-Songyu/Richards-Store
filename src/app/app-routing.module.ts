import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from "./cart/cart.component";
import { ProductsComponent } from "./products/products.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
  {path: '', component: ProductsComponent, pathMatch: 'full'},
  {path: 'cart', component: CartComponent},
  {path: 'products', component: ProductsComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
