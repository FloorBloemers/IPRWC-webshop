import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ApiService} from "../shared/services/api.service";
import {UserService} from "../user.service";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  submitLogin() {
    this.apiService
      .PostLogin({ username: this.username, password: this.password })
      .subscribe({
        next: (data) => {
          this.toastr.success('Login successful', 'Success');

          this.userService.getUserFromApi().subscribe({
            next: (user) => {
              // Customer exists → save and go home
              this.userService.setUser(user);
              this.router.navigate(['/home']);
            },
            error: (err) => {
              if (err.status === 404) {
                this.toastr.info('Please complete your customer profile');
                this.router.navigate(['/login']);
              } else {
                this.toastr.error('Error fetching customer', 'Error');
              }
            }
          });
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('Invalid username or password', 'Error');
        }
      });
  }
}
