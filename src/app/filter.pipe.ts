import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string, propName: string): any[] {
    const filtered: any[] = [];
    if(!items || searchTerm === "" || propName === "") {
      return items;
    }
    items.forEach(item => {
      if(item[propName].toLowerCase().includes(searchTerm.trim().toLowerCase())) {
        filtered.push(item);
      }
    });
    return filtered;
  }
}
