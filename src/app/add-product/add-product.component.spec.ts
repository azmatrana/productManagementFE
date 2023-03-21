import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductComponent } from './add-product.component';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isSubmit to true on addProduct', () => {
    component.addProduct();
    expect(component.isSubmit).toBeTruthy();
  });

  it('should set isNameInvalid to true if name is invalid', () => {
    component.productForm.controls['name'].setValue('');
    component.addProduct();
    expect(component.isNameInvalid).toBeTruthy();
  });

  it('should set isPriceInvalid to true if price is invalid', () => {
    component.productForm.controls['price'].setValue(-1);
    component.addProduct();
    expect(component.isPriceInvalid).toBeTruthy();
  });
  
});
