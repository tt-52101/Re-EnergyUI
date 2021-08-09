import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CustomTosterServiceService {

  constructor() { }

  success(msg) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      text: msg,
      showConfirmButton: false,
      timer: 3000
    });
  }

  error(msg) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      text: msg,
      showConfirmButton: false,
      timer: 1500
    });
  }

  warning(msg) {
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      text: msg,
      showConfirmButton: false,
      timer: 1500
    });
  }

}
