

import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[splitMinValue]',
  
})
export class SplitLocationNo {

    
    constructor(private eleref:ElementRef)
    {
       

    }
    @HostListener('keyup') keyup()
    {
      
        if(this.eleref.nativeElement.value!=null||this.eleref.nativeElement.value!=undefined||this.eleref.nativeElement.value!="")
        {
            let num=parseInt(this.eleref.nativeElement.value)
            if(num>3)
            {
                this.eleref.nativeElement.value=null;
            }
        }
    }

   

   

}
