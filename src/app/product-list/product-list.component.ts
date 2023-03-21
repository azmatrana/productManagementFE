import { Component, OnInit, ViewChild } from '@angular/core';
import { product } from '../shared/product-model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'createDate'];
  productList: product[] = [];
  dataSource: MatTableDataSource<product> = new MatTableDataSource<product>();
  pageSizes = [5, 10, 15, 20];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dateRange: { start: Date; end: Date } = {
    start: new Date(''),
    end: new Date(''),
  };

  constructor(
    private dialog: MatDialog,
    private productService: ProductService
  ) {
    this.productService.responseOfProductAdded.subscribe((value: boolean) => {
      if (value) {
        this.dialog.closeAll();
        this.fetchProductList();
      }
    });
  }

  ngOnInit(): void {
    this.fetchProductList();
  }

  ngAfterViewInit() {}

  fetchProductList() {
    this.productService.fetchProductList().subscribe((res: any) => {
      // this.dataSource = new MatTableDataSource<product>(res.products);
      this.productList = res.products;
      this.dataSource = new MatTableDataSource(this.productList);
      this.dataSource.paginator = this.paginator;
    });
  }

  filterProductWithDateRange() {
    this.dataSource.filterPredicate = (data: any) => {
      const date = new Date(data.createDate);
      return date >= this.dateRange.start && date <= this.dateRange.end;
    };
    this.dataSource.filter = 'customFilter';
  }

  clearFilter() {
    this.dataSource.filter = '';
  }

  openDialog() {
    this.dialog.open(AddProductComponent);
  }
}
