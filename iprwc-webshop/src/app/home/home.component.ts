import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {Product} from "../models/product.model";
import {ApiService} from "../shared/services/api.service";
import {RouterLink} from "@angular/router";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
}
