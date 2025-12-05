import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../models/product.model";
import {HeaderComponent} from "../header/header.component";
import {ApiService} from "../shared/services/api.service";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  @Input() id?: number;
  product!: Product;
  constructor(private apiService: ApiService,
              private cartService: CartService) {}


  ngOnInit(): void {
    this.apiService.getProducts().subscribe(data => {
      this.product = data.find((product: Product) => product.id == this.id);
    });
  }

  addToCart() {
    console.log('Product added to cart:', this.product.name);
    console.log(this.id);
    this.cartService.addToCart(this.product);
  }
}
