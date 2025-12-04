import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {productsComponent} from "./products/products.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {productStartComponent} from "./products/product-start/product-start.component";
import {productDetailComponent} from "./products/product-detail/product-detail.component";
import {productEditComponent} from "./products/product-edit/product-edit.component";

const appRoutes: Routes = [
  { path: '' , redirectTo: '/products', pathMatch: 'full'},
  { path: 'products' , component: productsComponent, children: [
      {path: '', component: productStartComponent},
      {path: 'new', component: productEditComponent},
      {path: ':id', component: productDetailComponent},
      {path: ':id/edit', component: productEditComponent}
    ]},
  { path: 'shopping-list' , component: ShoppingListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
