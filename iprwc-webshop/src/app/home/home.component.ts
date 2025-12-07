import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "../header/header.component";
import {Product} from "../models/product.model";
import {ApiService} from "../shared/services/api.service";
import {CartService} from "../cart.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    HeaderComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private apiService: ApiService,
              private cartService: CartService) {}

  ngOnInit(): void {
    this.apiService.getProducts().subscribe(data => {
      this.products = data;
      // console.log(this.products);
    });
  }
}
