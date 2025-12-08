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

}
