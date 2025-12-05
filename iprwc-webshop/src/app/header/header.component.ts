import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  username: string | null = '';
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.isAdmin = this.authService.isAdmin();
  }

  logout() {
    this.authService.signout();
  }
}
