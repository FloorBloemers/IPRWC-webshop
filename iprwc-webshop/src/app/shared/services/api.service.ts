import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { z } from 'zod';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import {environment} from "../../environments/environment";
import {Product} from "../../models/product.model";
import {Category} from "../../models/category.model";
import {User} from "../../models/user.model";
import {Order} from "../../models/order.model";


const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  lessonCreated = new EventEmitter<void>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  PostLogin(payload: { username: string; password: string }) {
    console.log('Login payload:', payload);

    return this.http.post(`${API_URL}/auth/login`, payload, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap((res: any) => {
        console.log('Raw login response:', res);

        // Adjust this line once you know the exact key
        const token = res.token || res.payload?.token || res.jwt;
        if (token) {
          this.authService.setToken(token);
          this.authService.setUsername(payload.username);
        }
      })
    );
  }

  getProducts() {
    return this.http.get(`${API_URL}/products`).pipe(
      map((data: any) => {
        const productSchema = z.object({
          id: z.number(),
          name: z.string(),
          price: z.number(),
          stock: z.number(),
          description: z.string(),
          imageUri: z.string(),
          category: z.object({
            id: z.number(),
            name: z.string(),
            description: z.string(),
          })
        });

        return data.map((item: Product) => productSchema.parse(item));
      })
    );
  }

  getCategories() {
    return this.http.get(`${API_URL}/categories`).pipe(
      map((data: any) => {
        const categorySchema = z.object({
          id: z.number(),
          name: z.string(),
          description: z.string()
        });

        return data.map((item: Category) => categorySchema.parse(item));
      })
    );
  }

  createProduct(product: Product) {
    let token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${API_URL}/products`, product, {
      headers: headers,
      observe: 'response',
    });
  }

  getLoggedInCustomer() {
    let token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${API_URL}/customers/logged-in`, {
      headers: headers,
      observe: 'response'
    })
  }

  createOrder(order: Order){
      let token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post(`${API_URL}/orders`, order, {
        headers: headers,
        observe: 'response',
      });
  }

  getOrders() {
    let token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${API_URL}/orders/logged-in`, {
      headers: headers,
      observe: 'response'
    })
  }

  getAllOrders() {
    let token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${API_URL}/orders`, {
      headers: headers,
      observe: 'response'
    })
  }

  PostRegister(payload: { username: string; password: string }) {
    return this.http.post(`${API_URL}/auth/register`, payload).pipe(
      map((data) => {
        return z
          .object({
            payload: z.object({
              token: z.string(),
            }),
          })
          .parse(data);
      }),
      tap((data) => {
        this.authService.setToken(data.payload.token);
        this.authService.setUsername(payload.username);
      })
    );
  }

  deleteProduct(product: Product) {
    let token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${API_URL}/products/`+ product.id, {
      headers: headers,
      observe: 'response',
    });
  }

  updateOrderStatus(id: number, status: string) {
    let token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`${API_URL}/orders/`+ id + '/status', status, {
      headers: headers,
      observe: 'response',
    });

  }
}
