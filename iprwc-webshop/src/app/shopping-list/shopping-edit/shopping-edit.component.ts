import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Product} from "../../products/products.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.scss'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Product;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.slService.getProduct(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        description: this.editedItem.description,
        imagePath: this.editedItem.imagePath,
        amount: this.editedItem.price
      })
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onPay() {
    return;
  }

  onDelete() {
    this.slService.deleteProduct(this.editedItemIndex);
  }
}
