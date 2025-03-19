import {Component, Input} from '@angular/core';
import { product } from "../../products.model";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class productItemComponent {
  @Input() product: product;
  @Input() index: number;
}
