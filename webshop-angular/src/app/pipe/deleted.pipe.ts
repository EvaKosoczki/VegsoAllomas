import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deleted'
})
export class DeletedPipe implements PipeTransform {

  transform(value: any, key: string, phrase1: string, phrase2: string, phrase3: string): any {
    return value.filter(item => {
      return ((item[key].indexOf(phrase1) > -1) ||
        (item[key].indexOf(phrase2) > -1) ||
        (item[key].indexOf(phrase3) > -1))
    });

  }
}
