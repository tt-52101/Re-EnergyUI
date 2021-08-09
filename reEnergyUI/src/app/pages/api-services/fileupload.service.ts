import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from '../../../environments/environment';
/* Naming NOTE
  The API's file field is `file` thus, we name it the same below
  it's like saying <input type='file' name='file' />
  on a standard file field
*/


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  apiBaseURL: string;
  isStatus: boolean;
  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.apiBaseURL = environment.apiUrl;

  }


  fileUpload(file: File, extraData?: object): any {
    let apiEndpoint = this.apiBaseURL + 'uploadS3/s3';
    const formData: FormData = new FormData();

    formData.append('file', file, file.name);
    if (extraData) {
      for (let key in extraData) {
        // iterate and set other form data
        formData.append(key, extraData[key])
      }
    }

    const req = new HttpRequest('POST', apiEndpoint, formData);
    return this.http.request(req)
  }



  uploadMultipleDocs(files: File[], extraData?: object, docsfor?: string): any {
    let apiEndpoint = this.apiBaseURL + 'DocsController';
    const formData: FormData = new FormData();

    for (let vfile of files) {
      var i = 0;
      formData.append("files", vfile, vfile.name); // "10-geninfo-1"
      i++;
    }

    formData.append("docsfor", docsfor); // "10-geninfo-1"



    const req = new HttpRequest('POST', apiEndpoint, formData);

    return this.http.request(req);

  }


  public deleteUploadedFile(fileGuid) {
    return this.http.delete<any>(this.apiBaseURL + "uploadS3/s3/" + fileGuid, {});
  }

  public downloadUploadedFile(fileGuid) {
    return this.http.get<any>(this.apiBaseURL + "uploadS3/s3?fileName=" + fileGuid, {});
  }



  checkImageFromate(fileNme): boolean {


    this.chekImageValidation(fileNme)


    return this.isStatus;

  }
  checkImageFromate1(fileNme): boolean {


    this.chekImageValidation1(fileNme)


    return this.isStatus;

  }
  checkImageFormat2(fileNme): boolean {


    this.chekImageValidation2(fileNme)


    return this.isStatus;

  }
  chekImageValidation(fileNme) {

    //console.log(fileNme);
    let fileName = fileNme
    var png = "png";
    var jpeg = "jpeg";
    var jpg = "jpg";
    var pdf = "pdf";
    var docx = "docx";
    // var xlsx = "xlsx";



    var fileExt = fileName.split(".");

    if (png.toLowerCase() == fileExt[1].toLowerCase() || jpeg.toLowerCase() == fileExt[1].toLowerCase() || jpg.toLowerCase() == fileExt[1].toLowerCase() || pdf.toLowerCase() == fileExt[1].toLowerCase() || docx.toLowerCase() == fileExt[1].toLowerCase()) {
      this.isStatus = false;

    } else {

      this.isStatus = true;

    }
  }

  chekImageValidation1(fileNme) {

    //console.log(fileNme);
    let fileName = fileNme
    // var png = "png";
    // var jpeg = "jpeg";
    // var jpg = "jpg";
    var pdf = "pdf";
    // var docx = "docx";
    // var xlsx = "xlsx";



    var fileExt = fileName.split(".");

    // if (png.toLowerCase() == fileExt[1].toLowerCase() || jpeg.toLowerCase() == fileExt[1].toLowerCase() || jpg.toLowerCase() == fileExt[1].toLowerCase() || pdf.toLowerCase() == fileExt[1].toLowerCase()) {
    //   this.isStatus = false;

    // } else {

    //   this.isStatus = true;

    // }
    if (pdf.toLowerCase() == fileExt[1].toLowerCase()) {
      this.isStatus = false;

    } else {

      this.isStatus = true;

    }
  }

  chekImageValidation2(fileNme) {

    //console.log(fileNme);
    let fileName = fileNme
    var png = "png";
    var jpeg = "jpeg";
    var jpg = "jpg";
    var pdf = "pdf";




    var fileExt = fileName.split(".");

    if (png.toLowerCase() == fileExt[1].toLowerCase() || jpeg.toLowerCase() == fileExt[1].toLowerCase() || jpg.toLowerCase() == fileExt[1].toLowerCase() || pdf.toLowerCase() == fileExt[1].toLowerCase()) {
      this.isStatus = false;

    } else {

      this.isStatus = true;

    }
  }
  //// files upload to server for Corrective Action for an Assessment 
  fileUploadHospitalStaffing(file: File, extraData?: object, cardName?: string): any {

    let apiEndpoint = this.apiBaseURL + 'excelImport/humanResource';
    const formData: FormData = new FormData();

    formData.append('file', file, file.name);
    formData.append('cardName', cardName);
    if (extraData) {
      for (let key in extraData) {
        // iterate and set other form data
        formData.append(key, extraData[key])
      }
    }

    const req = new HttpRequest('POST', apiEndpoint, formData);

    return this.http.request(req);

  }


  checkAsrDPformat(fileNme): boolean {
    let fileName = fileNme

    var png = "png";
    var jpeg = "jpeg";
    var jpg = "jpg";
    // var jpg = "bmp";

    var fileExt = fileName.split(".");

    if (png.toLowerCase() == fileExt[1].toLowerCase() || jpeg.toLowerCase() == fileExt[1].toLowerCase() || jpg.toLowerCase() == fileExt[1].toLowerCase()) {
      this.isStatus = false;
    }
    else
      this.isStatus = true;

    return this.isStatus;
  }

} // ends export
