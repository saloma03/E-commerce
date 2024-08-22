import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slicename',
  standalone: true
})
export class SlicenamePipe implements PipeTransform {

  transform(title: string , count :number): string {
    return title.split(" " , count).join();
  }

}
