import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private isProductAdded = new BehaviorSubject<boolean>(false);
  responseOfProductAdded = this.isProductAdded.asObservable();

  constructor(private http: HttpClient) {}

  fetchProductList() {
    let url = `${environment.baseUrl}/api/products`;
    return this.http.get(url);
  }

  addProduct(product: any) {
    let url = `${environment.baseUrl}/api/products`;
    return this.http.post(url, product);
  }

  productAdded(res: boolean) {
    this.isProductAdded.next(res);
  }
}
