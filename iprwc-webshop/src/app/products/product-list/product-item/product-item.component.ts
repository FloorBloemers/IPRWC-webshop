import {Component, Input} from '@angular/core';
import {Product} from "../../products.model";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class productItemComponent {
  @Input() product: Product;
  @Input() index: number;
}
