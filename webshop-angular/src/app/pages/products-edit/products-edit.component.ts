import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { Brand } from 'src/app/model/brand';
import { BrandsService } from 'src/app/service/brands.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
  oneProduct: Product;
  selectedProductId: number = 0;
  brands:Brand[];
  selectedBrand:number;

  constructor(
    private productsService: ProductsService,
    private ar: ActivatedRoute, private router: Router
    ) {
    this.ar.params.forEach(
      params => {
        this.selectedProductId = params.id
        this.productsService.getOne(this.selectedProductId).subscribe(
          data => {
            this.selectedBrand=data[0].brand;
            this.oneProduct = data[0];
            console.log(this.oneProduct);
            console.log(this.selectedBrand);
          }
        )
      }
    )
  }

  ngOnInit() {
    this.brandsService.getBrands().forEach(brands =>{
      this.brands =brands;
      console.log(this.brands);
    })
  };

  onSubmit(ev: Event) {
    ev.preventDefault();
    console.log(this.selectedBrand);
    this.oneProduct.brand=this.selectedBrand;
    this.productsService.update(this.oneProduct)
      .subscribe(
        response => {
          this.router.navigateByUrl("/products");
          console.log("sikeres")
        },
        err => {
          this.router.navigateByUrl("/products");
          console.error(err)
        })
  }
  onCancel() {
    this.router.navigateByUrl("/products");
  }
}