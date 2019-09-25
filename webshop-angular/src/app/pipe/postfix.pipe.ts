import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postfix'
})
export class PostfixPipe implements PipeTransform {

  transform(newProduct: any, ProductName: string): any {
    newProduct = ProductName
    let postfixedName = newProduct.replace(/[ ]/g, "_");
    return postfixedName;
  }

}
