import {Component, OnInit} from '@angular/core';
import {Product} from "../products.model";
import {productsService} from "../products.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class productDetailComponent implements OnInit{
  product: Product;
  id: number;

  constructor(private productService: productsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.product = this.productService.getProduct(this.id);
    })
  }

  onAddToShoppingList() {
    this.productService.addProductToShoppingList(this.product);
  }

  onEditProduct() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteProduct() {
    this.productService.deleteProduct(this.id);
    this.router.navigate(['products']);
  }
}
