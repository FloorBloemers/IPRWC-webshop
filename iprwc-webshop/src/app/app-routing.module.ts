import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {productsComponent} from "./products/products.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {HomeComponent} from "./home/home.component";
import {ProductComponent} from "./product/product.component";
import {CartComponent} from "./cart/cart.component";
import {AportalComponent} from "./aportal/aportal.component";
import {CportalComponent} from "./cportal/cportal.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {CustomerFormComponent} from "./customer-form/customer-form.component";
import {ConfirmOrderComponent} from "./confirm-order/confirm-order.component";


const appRoutes: Routes = [
  { path: '' , redirectTo: '/home', pathMatch: 'full'},
  { path: 'login' , component: LoginComponent},
  { path: 'register' , component: RegisterComponent},
  { path: 'products' , component: productsComponent},
  { path: 'home' , component: HomeComponent},
  { path: 'products/:id' , component: ProductComponent},
  { path: 'cart' , component: CartComponent},
  { path: 'admin' , component: AportalComponent},
  { path: 'checkout' , component: CheckoutComponent},
  { path: 'customer-form' , component: CustomerFormComponent},
  { path: 'confirm-order' , component: ConfirmOrderComponent},
  { path: 'account' , component: CportalComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
