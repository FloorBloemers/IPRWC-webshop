import {Customer} from "./customer.model";

export interface Order {
  id?: number;
  customer: Customer;
  date?: Date;
  totalPrice: number;
  status?: string;
}
