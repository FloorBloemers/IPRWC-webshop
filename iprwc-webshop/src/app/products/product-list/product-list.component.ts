import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../products.model";
import {productsService} from "../products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class productListComponent implements OnInit, OnDestroy{
  products: Product[];
  subscription: Subscription;

  constructor(private productService: productsService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.productService.productsChanged.subscribe((products: Product[]) => {
      this.products = products;
    });
    this.products = this.productService.getProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewProduct() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
