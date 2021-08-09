import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ngbDateFrmt'
})
export class NgbDateFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if(value==null||value==undefined||value=="")
    {
      return null;
    }
    // let date = value.year + '/' + value.month + '/' + value.day
    let date = value.year + '/' + value.month + '/' + value.day
    return date;
  }

}
