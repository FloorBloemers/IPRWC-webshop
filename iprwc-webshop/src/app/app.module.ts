import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { AportalComponent} from "./aportal/aportal.component";
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownDirective} from "./shared/dropdown.directive";
import {AppRoutingModule} from "./app-routing.module";
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HomeComponent,
    ProductComponent,
    HeaderComponent,
    CartComponent,
    ConfirmOrderComponent,
    CheckoutComponent,
    ProductsComponent,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AportalComponent,
    CheckoutComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
