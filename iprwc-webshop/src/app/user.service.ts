import {Injectable} from '@angular/core';
import {User} from "./models/user.model";
import {ApiService} from "./shared/services/api.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User = {} as User;

  constructor(private apiService: ApiService) {
  }

  getUserFromApi(): Observable<User> {
    return this.apiService.getLoggedInUser().pipe(
      map((response) => {
        if (response.status === 200) {
          return response.body as User;
        } else {
          throw new Error('Unexpected status when fetching user');
        }
      })
    );

  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }
}
