import {Injectable} from '@angular/core';
import {Customer} from "./models/customer.model";
import {ApiService} from "./shared/services/api.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customer: Customer = {} as Customer;

  constructor(private apiService: ApiService) {
  }

  getCustomerFromApi() {
    this.apiService.getLoggedInCustomer().subscribe({
      next: (response) => {
        if (response.status === 200) {
          let body = JSON.stringify(response.body);
          this.customer = JSON.parse(body);
        } else {
          console.error('An error occured when checking for existing customer');
        }
      }
    })

  }

  setCustomer(customer: Customer) {
    this.customer = customer;
  }

  getCustomer(): Customer {
    return this.customer;
  }
}
