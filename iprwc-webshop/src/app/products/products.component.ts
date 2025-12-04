import { Component, OnInit } from '@angular/core';
import {productsService} from "./products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class productsComponent implements OnInit{

  constructor() {
  }

  ngOnInit() {
  }
}
