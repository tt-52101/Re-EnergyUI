import { Directive, Input } from '@angular/core';
import { Validator, ValidationErrors, FormGroup, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appMinOneTableRecord]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinOneTableRecordDirective, multi: true }],

})
export class MinOneTableRecordDirective implements Validator{
  @Input() tabledata: Array<any>;
 
  constructor() { 
    

  }

  validate(form: FormGroup): ValidationErrors {
    
    let recordcount= this.tabledata?.length;
    
    if(recordcount==0||recordcount==undefined)
    {
      return { "minOneTableEntry": true }
    }
    else
    {
      return null;
    }
    
    

  }

}
