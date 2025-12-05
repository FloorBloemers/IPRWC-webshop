import { Injectable } from '@angular/core';
import {Product} from "./models/product.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];

  constructor() {
    this.loadItems();
  }

  addToCart(product: Product) {
    this.items.push(product);
    this.saveItems();
  }

  getItems() {
    return this.items;
  }

  removeFromCart(index: number) {
    this.items.splice(index, 1);
    this.saveItems();
  }

  clearCart() {
    this.items = [];
    this.saveItems();
  }

  private saveItems() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  private loadItems() {
    const storedItems = localStorage.getItem('cart');
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
  }

  getTotal() {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }
}
