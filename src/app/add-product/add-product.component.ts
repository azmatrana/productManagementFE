import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { product } from '../shared/product-model';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm = new FormGroup({
    name: new FormControl("", Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0)])
  });
  isSubmit: boolean = false;
  isNameInvalid: boolean = false;
  isPriceInvalid: boolean = false;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
  }

  addProduct() {
    this.isSubmit = true;
    this.isNameInvalid = this.productForm.controls.name.invalid ? true : false;
    this.isPriceInvalid = this.productForm.controls.price.invalid ? true : false;

    if (this.productForm.valid) {
      let product = {
        name: this.productForm.controls.name.value,
        price: this.productForm.controls.price.value,
        createDate: new Date()
      }
      this.productService.addProduct(product).subscribe(
        (response: any) => {
          if(response.status == 200){
            this.productService.productAdded(true);
          }
        },
        (error: any) => {
          this.productService.productAdded(false);
        }
      )
    }
  }

}
