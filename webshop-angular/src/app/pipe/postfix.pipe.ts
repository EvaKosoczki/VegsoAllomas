import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postfix'
})
export class PostfixPipe implements PipeTransform {

  transform(newProduct: any): any {
    let postfixedName = newProduct.replace(/[ ]/g, "-");
    return postfixedName;
  }

}
