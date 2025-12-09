import {Component, OnInit} from '@angular/core';
import {Order} from "../models/order.model";
import {ApiService} from "../shared/services/api.service";
import {ToastrService} from "ngx-toastr";
import {CommonModule} from "@angular/common";
import {User} from "../models/user.model";
import {UserService} from "../user.service";
import {HeaderComponent} from "../header/header.component";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-cportal',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './cportal.component.html',
  styleUrl: './cportal.component.css'
})
export class CportalComponent implements OnInit{

  orders: Order[] = [];
  user: User = {} as User;
  username: string | null = '';
  isAdmin: boolean = false;

  constructor(private apiService: ApiService,
              private authService: AuthService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.isAdmin = this.authService.isAdmin();
    this.authService.getUsernameObservable().subscribe(name => {
      this.username = name;
    });
    this.parseOrders();
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
