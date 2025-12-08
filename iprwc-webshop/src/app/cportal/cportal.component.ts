import {Component, OnInit} from '@angular/core';
import {Order} from "../models/order.model";
import {ApiService} from "../shared/services/api.service";
import {ToastrService} from "ngx-toastr";
import {CommonModule} from "@angular/common";
import {User} from "../models/user.model";
import {UserService} from "../user.service";

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
  user: User = {} as User;

  constructor(private apiService: ApiService,
              private userService: UserService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.parseOrders();

    this.userService.getUserFromApi().subscribe({
      next: (user) => {
        this.user = user;
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
