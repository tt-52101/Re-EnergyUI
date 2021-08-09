import { PipeTransform, Pipe } from '@angular/core';



@Pipe({
    name:"activateTabIndex",
    pure: false
})
export class activateTabIndex implements PipeTransform
{

    transform(data:Array<any>):number
    {
        
       let index= data.findIndex(x=>x.outsource==true)
        return index;

       

    }
}