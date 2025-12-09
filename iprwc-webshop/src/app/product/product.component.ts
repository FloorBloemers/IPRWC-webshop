import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../models/product.model";
import {ApiService} from "../shared/services/api.service";
import {CartService} from "../cart.service";
import { ActivatedRoute } from '@angular/router';
import {HeaderComponent} from "../header/header.component";

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
  id!: number;
  product?: Product;
  constructor(private apiService: ApiService,
              private cartService: CartService, private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.apiService.getProducts().subscribe(data => {
      this.product = data.find(p => p.id === this.id);
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
