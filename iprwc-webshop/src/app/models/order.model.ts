import {User} from "./user.model";

export interface Order {
  id?: number;
  user: User;
  date?: Date;
  totalPrice: number;
  status?: string;
}
