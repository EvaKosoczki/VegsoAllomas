import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any): any {
    let yearMonth = JSON.stringify(value)
      .replace(/"[^"]*"\:/g, '')
      .replace(/[",\{\}]/g, '')
      .replace(/\-..T22:00:00.000Z/, '');
    return yearMonth;
  }

}
