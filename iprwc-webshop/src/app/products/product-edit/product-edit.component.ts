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
      this.productService.updateproduct(this.id, this.productForm.value);
    } else {
      this.productService.addproduct(this.productForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient() {
    (<FormArray>this.productForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
    }));
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.productForm.get('ingredients')).removeAt(index);
  }

  get controls() {
    return (<FormArray>this.productForm.get('ingredients')).controls;
  }

  private initForm() {
    let productName = '';
    let productImagePath = '';
    let productDescription = '';
    let productIngredients = new FormArray([]);

    if (this.editMode) {
      const product = this.productService.getproduct(this.id);
      productName = product.name;
      productImagePath = product.imagePath;
      productDescription = product.description;
      if (product['ingredients']) {
        for (let ingredient of product.ingredients) {
          productIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }))
        }
      }
    }

    this.productForm = new FormGroup({
      'name' : new FormControl(productName, Validators.required),
      'imagePath' : new FormControl(productImagePath, Validators.required),
      'description' : new FormControl(productDescription, Validators.required),
      'ingredients': productIngredients
    });
  }

  protected readonly oncancel = oncancel;
}
