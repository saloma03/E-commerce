import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObjects : any[] , searchWord :string): any[] {
    return arrayOfObjects.filter((item)=>item.title.toLowerCase().includes(searchWord.toLowerCase()));
  }

}
