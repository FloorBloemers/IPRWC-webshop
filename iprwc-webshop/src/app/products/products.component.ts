import {Component, OnInit} from '@angular/core';
import {ApiService} from "../shared/services/api.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "../header/header.component";
import {Product} from "../models/product.model";
import {RouterLink} from "@angular/router";
import {CartComponent} from "../cart/cart.component";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, RouterLink, CartComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})


export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private apiService: ApiService,
              private cartService: CartService) {}

  ngOnInit() {
    this.apiService.getProducts().subscribe(data => {
      this.products = data;
      // console.log(this.products);
    });
  }

  addToCart(product: Product) {
    // Implement the logic to add the product to the cart
    this.cartService.addToCart(product);
  }

}
