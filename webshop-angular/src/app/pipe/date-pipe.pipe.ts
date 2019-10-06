import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(value: any): any {
    let yearMonth = JSON.stringify(value)
      .replace(/"[^"]*"\:/g, '')
      .replace(/[",\{\}]/g, '')
      .replace(/T..:..:...000Z/, '');
    return yearMonth;
  }

}
