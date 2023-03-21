import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private isProductAdded = new BehaviorSubject<boolean>(false);
  responseOfProductAdded = this.isProductAdded.asObservable();

  constructor(private http: HttpClient) {
  }

  fetchProductList(){
    let url = "test/example";
    return this.http.get(url);
  }

  addProduct(product: any){
    let url = "test/example";
    return this.http.post(url, product);
  }

  productAdded(res: boolean){
    this.isProductAdded.next(res);
  }
  
}
