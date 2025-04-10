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
    LoginComponent
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
