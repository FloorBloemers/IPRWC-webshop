import {Subject} from "rxjs";
import {Product} from "../products/products.model";

export class ShoppingListService {
  productsChanged = new Subject<Product[]>();
  startedEditing = new Subject<number>();

  private products: Product[] = [
    new Product("Aardbei", "Een sappige aardbei", "", 10),
    new Product("Banaan", "Een sappige banaan", "", 20),
  ]

  getProducts() {
    return this.products.slice();
  }

  getProduct(index: number) {
    return this.products[index];
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productsChanged.next(this.products.slice());
  }

  updateProduct(index: number, newProduct: Product) {
    this.products[index] = newProduct;
    this.productsChanged.next(this.products.slice());
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.productsChanged.next(this.products.slice());
  }
}
