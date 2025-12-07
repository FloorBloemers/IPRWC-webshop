import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Category} from "../models/category.model";
import {ApiService} from "../shared/services/api.service";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {Product} from "../models/product.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-aportal',
  standalone: true,
  imports: [
    CommonModule, HttpClientModule, FormsModule
  ],
  templateUrl: './aportal.component.html',
  styleUrl: './aportal.component.css'
})
export class AportalComponent implements OnInit {
  categories: Category[] = [];
  products: Product[] = [];
  product!: Product;

  constructor(private apiService: ApiService,
              private toastr: ToastrService) {}

  onSubmit(productForm: NgForm) {
    this.product = productForm.value;
    this.product.category = <Category>this.categories.find(category => category.id == productForm.value.category);
    this.apiService.createProduct(this.product).subscribe({
      next: (response) => {
        if (response.status === 201) {
          this.toastr.success('Product created', 'Success');
          this.fetchProducts();
        }
        else {
          this.toastr.error('An error occured when creating product', 'Error');
        }
      }
    })
  }

  deleteProduct(product: Product) {
    this.apiService.deleteProduct(product).subscribe({
      next: (response) => {
        if (response.status === 204) {
          this.toastr.success('Product deleted', 'Success');
          this.fetchProducts();
        }
        else {
          this.toastr.error('An error occured when deleting product', 'Error');
        }
      }
    })
  }

  ngOnInit() {
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts() {
    this.apiService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  fetchCategories() {
    this.apiService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
}
