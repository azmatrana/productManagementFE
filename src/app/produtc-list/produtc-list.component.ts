import { Component, OnInit, ViewChild } from '@angular/core';
import { product } from '../shared/product-model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { ProductService } from '../shared/product.service';

// const ELEMENT_DATA: product[] = [
//   // {name: 'Product 1', price: 10, createDate: new Date("03/21/2021")},
//   // {name: 'Product 2', price: 15, createDate: new Date("03/21/2022")},
//   // {name: 'Product 3', price: 20, createDate: new Date("03/01/2023")},
//   // {name: 'Product 4', price: 25, createDate: new Date("03/15/2023")},
//   // {name: 'Product 5', price: 30, createDate: new Date("03 /21/2023")},
// ];

@Component({
  selector: 'app-produtc-list',
  templateUrl: './produtc-list.component.html',
  styleUrls: ['./produtc-list.component.css']
})
export class ProdutcListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price', 'createDate'];
  // dataSource : MatTableDataSource<product> = new MatTableDataSource<product>(ELEMENT_DATA);
  dataSource : MatTableDataSource<product> = new MatTableDataSource<product>();
  pageSizes = [5,10,15,20]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dateRange: {start: Date, end: Date} = {start: new Date(''), end: new Date('')};

  constructor(private dialog: MatDialog, private productService: ProductService ) {
    this.productService.responseOfProductAdded.subscribe(
      (value: boolean) => {
        if(value){
          this.dialog.closeAll();
          this.fetchProductList();
        }
      } 
    )
  }

  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.fetchProductList();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator
  }

  fetchProductList(){
    this.productService.fetchProductList().subscribe(
      (res: any) =>{
        this.dataSource = new MatTableDataSource(res);
      }
    )
  }

  filterProductWithDateRange(){
    this.dataSource.filterPredicate = (data: any) => {
      const date = new Date(data.createDate);
      return date >= this.dateRange.start && date <= this.dateRange.end;
    }
    this.dataSource.filter = 'customFilter';
  }

  clearFilter(){
    this.dataSource.filter = '';
  }

  openDialog(){
    this.dialog.open(AddProductComponent);
  }

}
