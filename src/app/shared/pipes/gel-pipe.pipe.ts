import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gelPipe',
})
export class GelPipePipe implements PipeTransform {
  transform(text: string | number, hasSpace: boolean): unknown {
    return hasSpace ? `${text} ₾` : `${text}₾`;
  }
}
