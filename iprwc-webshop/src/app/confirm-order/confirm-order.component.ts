import {Component, OnInit} from '@angular/core';
import {Customer} from "../models/customer.model";
import {Product} from "../models/product.model";
import {CartService} from "../cart.service";
import {ApiService} from "../shared/services/api.service";
import {ToastrService} from "ngx-toastr";
import {CustomerService} from "../customer.service";
import {Router, RouterLink} from "@angular/router";
import {Order} from "../models/order.model";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-confirm-order',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './confirm-order.component.html',
  styleUrl: './confirm-order.component.css'
})
export class ConfirmOrderComponent implements OnInit{
  customer!: Customer;
  cartItems!: Product[];
  finalPrice: number = 0;
  order!: Order;

  constructor(private cartService: CartService,
              private apiService: ApiService,
              private customerService: CustomerService,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.finalPrice = this.cartService.getTotal();
    this.customer = this.customerService.getCustomer();
    this.order = {
      customer: this.customer,
      totalPrice: this.finalPrice
    }
    // this.productOrder.status = "New";
  }

  placeOrder() {
    if (!this.order) {
      this.toastr.error('Order not ready', 'Error');
      return;
    }

    this.apiService.createOrder(this.order).subscribe({
      next: (response) => {
        if (response.status === 201) {
          this.toastr.success('Order created', 'Success');
          this.cartService.clearCart();
          this.router.navigate(['/home']);
        } else {
          this.toastr.error('An error occurred when creating order', 'Error');
        }
      },
      error: (err) => {
        this.toastr.error('Failed to create order', 'Error');
        console.error(err);
      }
    });
  }
}
