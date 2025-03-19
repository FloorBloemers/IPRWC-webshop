import {product} from "./products.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class productsService {
  productsChanged = new Subject<product[]>;

  private products: product[] = [
    new product("Schnitzel", "This is simply a Test", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505", [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]),
    new product("Burger", "This is simply a Test", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505", [new Ingredient('Buns', 2), new Ingredient('Meat', 1)])
  ];

  constructor(private slService: ShoppingListService) {
  }

  getproducts() {
    return this.products.slice();
  }

  getproduct(index: number) {
    return this.products[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addproduct(product: product) {
    this.products.push(product);
    this.productsChanged.next(this.products.slice());
  }

  updateproduct(index: number, newproduct: product) {
    this.products[index] = newproduct;
    this.productsChanged.next(this.products.slice());
  }

  deleteproduct(index: number) {
    this.products.splice(index, 1);
    this.productsChanged.next(this.products.slice());
  }
}
