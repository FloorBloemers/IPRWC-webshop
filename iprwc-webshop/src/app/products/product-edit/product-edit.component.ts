import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {productsService} from "../products.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class productEditComponent implements OnInit{
  id: number;
  editMode = false;
  productForm: FormGroup;

  constructor(private route: ActivatedRoute, private productService: productsService, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    })
  }

  onSubmit() {
    if (this.editMode) {
      this.productService.updateProduct(this.id, this.productForm.value);
    } else {
      this.productService.addProduct(this.productForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let productName = '';
    let productImagePath = '';
    let productDescription = '';
    let productPrice: number;

    if (this.editMode) {
      const product = this.productService.getProduct(this.id);
      productName = product.name;
      productImagePath = product.imagePath;
      productDescription = product.description;
      productPrice = product.price;
    }

    this.productForm = new FormGroup({
      'name' : new FormControl(productName, Validators.required),
      'imagePath' : new FormControl(productImagePath, Validators.required),
      'description' : new FormControl(productDescription, Validators.required),
      'price': new FormControl(productPrice, Validators.required)
    });
  }

  protected readonly oncancel = oncancel;
}
