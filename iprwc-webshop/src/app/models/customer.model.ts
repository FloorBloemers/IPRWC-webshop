export interface Customer {
  id?: number;
  name: string;
  email: string;
  optionalRegisteredUser?: { username: string; };
}
