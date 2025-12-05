import {Injectable} from '@angular/core';
import {Customer} from "./models/customer.model";
import {ApiService} from "./shared/services/api.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customer: Customer = {} as Customer;

  constructor(private apiService: ApiService) {
  }

  getCustomerFromApi(): Observable<Customer> {
    return this.apiService.getLoggedInCustomer().pipe(
      map((response) => {
        if (response.status === 200) {
          return response.body as Customer;
        } else {
          throw new Error('Unexpected status when fetching customer');
        }
      })
    );

  }

  setCustomer(customer: Customer) {
    this.customer = customer;
  }

  getCustomer(): Customer {
    return this.customer;
  }
}
