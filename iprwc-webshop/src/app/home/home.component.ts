import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
