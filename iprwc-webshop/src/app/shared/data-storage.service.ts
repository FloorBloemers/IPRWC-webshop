import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {productsService} from "../products/products.service";


@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private productsService: productsService) {}

  storeProduct(index: number) {
    const product = this.productsService.getProduct(index);
    //this.http.post({});
  }
}
