
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ApiService} from "../shared/services/api.service";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService
  ) {}

  submitRegister() {
    this.apiService
      .PostRegister({ username: this.username, password: this.password })
      .subscribe({
        next: (data) => {
          this.toastr.success('Register successful', 'Success');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('User already exists', 'Error');
        },
      });
  }
}
