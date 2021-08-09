import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uploadbtnpipe'
})
export class UploadButtonPipe implements PipeTransform {

  transform(value: any, args?: any): any {
   
  
    if (value == null || value == "") {
      return {
        'bx bx-file': true,
        //'fa-2x': true,
        'text-success': true,
      }
    }
    let clsApply = {
      'bx bx-file': true,
      //'fa-2x': true,
      'after-color-eye': true,
    }

    return clsApply;

  }

}
