import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deleted'
})
export class DeletedPipe implements PipeTransform {

  transform(inArray: any, searched: any): any {
    return inArray.filter((item) => {
      return item.searched != 'deleted';
    });
  }

}
