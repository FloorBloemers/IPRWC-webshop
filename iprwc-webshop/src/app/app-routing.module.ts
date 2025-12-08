import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProductsComponent} from "./products/products.component";
import {HomeComponent} from "./home/home.component";
import {ProductComponent} from "./product/product.component";
import {CartComponent} from "./cart/cart.component";
import {AportalComponent} from "./aportal/aportal.component";
import {CportalComponent} from "./cportal/cportal.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {ConfirmOrderComponent} from "./confirm-order/confirm-order.component";


const appRoutes: Routes = [
  { path: '' , redirectTo: '/home', pathMatch: 'full'},
  { path: 'login' , component: LoginComponent},
  { path: 'register' , component: RegisterComponent},
  { path: 'products' , component: ProductsComponent},
  { path: 'home' , component: HomeComponent},
  { path: 'products/:id' , component: ProductComponent},
  { path: 'cart' , component: CartComponent},
  { path: 'admin' , component: AportalComponent},
  { path: 'checkout' , component: CheckoutComponent},
  { path: 'confirm-order' , component: ConfirmOrderComponent},
  { path: 'my-account' , component: CportalComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
