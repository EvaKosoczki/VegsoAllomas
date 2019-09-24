import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postfix'
})
export class PostfixPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
