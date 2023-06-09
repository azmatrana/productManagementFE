import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ProductService } from '../shared/product.service';
import { ProductListComponent } from './product-list.component'
import { AddProductComponent } from '../add-product/add-product.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let productService: ProductService;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the paginator', () => {
    expect(component.paginator).toBeDefined();
    expect(component.dataSource.paginator).toBe(component.paginator);
  });

  it('should clear the filter from data source', () => {
    component.clearFilter();
    expect(component.dataSource.filter).toBe('');
  });

});
