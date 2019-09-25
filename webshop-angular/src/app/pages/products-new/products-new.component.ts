import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products-new.component.css']
})
export class ProductsNewComponent implements OnInit {
  addedProduct: Product = new Product();
  originalName: string = '';
  replacedName: string = '';

  constructor(private productService: ProductsService,
    private router: Router) { }

  ngOnInit() {
  }
  onSubmit(ev: Event): void {
    ev.preventDefault();

    this.productService.create(this.addedProduct).subscribe(
      response => {
        console.log('sikeres');
        this.router.navigateByUrl("/products")
      },
      err =>
        console.error(err),
    )
  }

  regexReplacer(param) {
    this.addedProduct.postfix = param;
  }
  onBlurMethod(data) {
    this.addedProduct.postfix = data.target.value
  }
}
