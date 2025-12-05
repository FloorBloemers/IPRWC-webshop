import {Component, OnInit} from '@angular/core';
import {Order} from "../models/order.model";
import {ApiService} from "../shared/services/api.service";
import {ToastrService} from "ngx-toastr";
import {CommonModule} from "@angular/common";
import {Customer} from "../models/customer.model";
import {CustomerService} from "../customer.service";

@Component({
  selector: 'app-cportal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './cportal.component.html',
  styleUrl: './cportal.component.css'
})
export class CportalComponent implements OnInit{

  orders: Order[] = [];
  customer: Customer = {} as Customer;

  constructor(private apiService: ApiService,
              private customerService: CustomerService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.parseOrders();

    this.customerService.getCustomerFromApi().subscribe({
      next: (customer) => {
        this.customer = customer;
      },
      error: (err) => {
        this.toastr.error('Failed to load customer', 'Error');
        console.error(err);
      }
    });
  }

  parseOrders() {
    this.apiService.getOrders().subscribe({
      next: (response) => {
        let body = JSON.stringify(response.body);
        let parsed = JSON.parse(body);
        if (response.status === 200) {
          this.orders = parsed;
        } else {
          this.toastr.error('An error occured when fetching orders', 'Error');
          // console.error('An error occured when fetching orders');
        }
      }
    })

  }

}
