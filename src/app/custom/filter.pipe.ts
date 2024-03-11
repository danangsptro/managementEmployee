import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Array<any>, searchText: string, minTerm : number = 0): any {
    if (searchText && searchText.length >= minTerm) {
      return items.filter(item => {
        const filter = Object.keys(item);
        // Array.some() returns true if at least one entry meets the given condition
        return filter.some(
          key => {
            return ('' + item[key]).toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
          }
        );
      });
    }

    return items;
  }

}
