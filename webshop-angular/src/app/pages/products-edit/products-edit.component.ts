import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
  oneProduct: Product;
  selectedProductId: number = 0;

  constructor(private productsService: ProductsService,
    private ar: ActivatedRoute, private router: Router) {
    this.ar.params.forEach(
      params => {
        this.selectedProductId = params.id
        this.productsService.getOne(this.selectedProductId).subscribe(
          data => this.oneProduct = data
        )
      }
    )
  }

  ngOnInit() {

  };

  onSubmit(ev: Event) {
    ev.preventDefault();
    this.productsService.update(this.oneProduct)
      .subscribe(
        response => {
          console.log("sikeres")
        },
        err => {
          this.router.navigateByUrl("/products")
          console.error(err)
        })
  }
  onCancel() {
    this.router.navigateByUrl("/products")
  }
}