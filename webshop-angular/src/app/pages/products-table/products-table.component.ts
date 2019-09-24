import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/service/products.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  data: Product[];
  changeCounter: number = 0;
  url: string = this.router.url

  constructor(private baseService: BaseService,
    private router: Router) {
    this.baseService.getAll().subscribe(products => this.data = products)
  }

  ngOnInit() {
  }
  //postfix v id alapján törlünk?
  onDelete(picked: Product) {
    this.baseService.delete(picked.id).subscribe(
      response => {
        let index = this.data.indexOf(picked);
        this.data.splice(index, 1);
        this.changeCounter++;
      },
      err => console.error(err)
    )
  }

}
