import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { productsComponent } from './products/products.component';
import { productListComponent } from './products/product-list/product-list.component';
import { productDetailComponent } from './products/product-detail/product-detail.component';
import { productItemComponent } from './products/product-list/product-item/product-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownDirective} from "./shared/dropdown.directive";
import {ShoppingListService} from "./shopping-list/shopping-list.service";
import {AppRoutingModule} from "./app-routing.module";
import { productStartComponent } from './products/product-start/product-start.component';
import { productEditComponent } from './products/product-edit/product-edit.component';
import {productsService} from "./products/products.service";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { CportalComponent } from './cportal/cportal.component';
import { AportalComponent } from './aportal/aportal.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    productsComponent,
    productListComponent,
    productDetailComponent,
    productItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    productStartComponent,
    productEditComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    CportalComponent,
    AportalComponent,
    CheckoutComponent,
    CustomerFormComponent,
    ConfirmOrderComponent,
    HomeComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ShoppingListService, productsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
