import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadButtonPipe } from 'src/app/custompipes/fileuploadcss';
import { NgbDateFormatPipe } from 'src/app/custompipes/ngb-date-format.pipe';
import { DaNcbtnColorPipe } from 'src/app/custompipes/DaNcbtnColorPipe.pipe';
import { DaNcBtnHideShowPipe } from 'src/app/custompipes/DaNcBtnHideShow.pipe';
import { MinOneCheckboxSelectDirective } from 'src/app/customValidater/min-one-checkbox-select.directive';
import { MinOneTableRecordDirective } from 'src/app/customValidater/min-one-table-record.directive';
import { SplitLocationNo } from 'src/app/customValidater/SplitLocNo.directive';
import { ToastrModule } from 'ngx-toastr';
import { LaddaModule } from 'angular2-ladda';





@NgModule({
  declarations: [SplitLocationNo, UploadButtonPipe, NgbDateFormatPipe, DaNcbtnColorPipe, DaNcBtnHideShowPipe, MinOneCheckboxSelectDirective, MinOneTableRecordDirective],
  imports: [
    CommonModule,
    LaddaModule,

    ToastrModule.forRoot(),


  ],
  exports: [SplitLocationNo, UploadButtonPipe, NgbDateFormatPipe, DaNcbtnColorPipe, DaNcBtnHideShowPipe, MinOneCheckboxSelectDirective, MinOneTableRecordDirective]
})
export class SharedModule { }
