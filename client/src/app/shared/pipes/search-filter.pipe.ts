import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
        return items.filter( it => {
            return it.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
        });
   }

}
