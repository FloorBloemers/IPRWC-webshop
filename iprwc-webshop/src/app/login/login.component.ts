import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ApiService} from "../shared/services/api.service";
import {CustomerService} from "../customer.service";


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
    private customerService: CustomerService
  ) {}

  submitLogin() {
    this.apiService
      .PostLogin({ username: this.username, password: this.password })
      .subscribe({
        next: (data) => {
          this.toastr.success('Login successful', 'Success');
          this.router.navigate(['/home']);
          this.customerService.getCustomerFromApi();
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('Invalid username or password', 'Error');
        },
      });
  }
}
