import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/service/base.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  allData: Product[] = [];
  changeCounter: number = 0;


  constructor(private productService: ProductsService) {
    this.productService.getAll().subscribe(products => this.allData = products)
  }

  ngOnInit() {
  }
  onDelete(picked: Product) {

    picked.postfix = 'deleted';
    this.productService.update(picked).subscribe(
      response => {
        this.changeCounter++;
      },
      err => console.error(err),
    )
  }

  showDetails(id){
    document.getElementById(`details${id}`).classList.toggle("show");  
    document.getElementById(`details${id}`).classList.toggle("noShow");  
  }

}
