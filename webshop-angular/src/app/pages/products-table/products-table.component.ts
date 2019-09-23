import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/service/products.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  data: Product[];
  heads: string[] = [];
  constructor(private baseService: BaseService) {
    this.baseService.getAll().subscribe(products => this.data = products)
  }


  ngOnInit() {
    
  }

}
