import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products-new.component.css']
})
export class ProductsNewComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  addedProduct: Product;
  originalName: string = '';
  replacedName: string = '';


  constructor(private productService: ProductsService,
    private router: Router) {
      
     }

  ngOnInit() {
    this.addedProduct = new Product();
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
    console.log(param)
    return this.addedProduct.postfix = param;
  }

  sizeValidator(control: AbstractControl){
    
      let regex = new RegExp('^(1[0-9]{2}|20[0-9]|210)$')
      if(!regex.test(control.value) || control.value === ''){
        return {isError: true}
      }
    
    return null
  }

  priceValidator(control: AbstractControl){
    if(control && control.value !== null || control.value !== undefined){
      let regex = new RegExp('^([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-5][0-9]{3}|6[0-4][0-9]{2}|65[0-7][0-9]|6580)$')
      if(!regex.test(control.value) || control.value === ''){
        return {isError: true}
      }
    }
    return null
  }
}
