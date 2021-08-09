import { Directive } from '@angular/core';
import { FormGroup, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appMinOneCheckboxSelect]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinOneCheckboxSelectDirective, multi: true }]

})
export class MinOneCheckboxSelectDirective implements Validator {

  validate(form: FormGroup): ValidationErrors {
    
    let selectectedcount = 0;
    Object.keys(form.controls).forEach(key => {



      if(form.get(key).disabled)
      {
        return null;
      }
      if (form.get(key).value === true) {
        selectectedcount++;
      }

    })
    if (selectectedcount > 0) {
      return null;
    }
    else {
      return { "minOneChecked": true }

    }

  }

}
