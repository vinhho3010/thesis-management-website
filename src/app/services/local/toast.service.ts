import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  showSuccessToast(message: string){
    const successToast = Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 2000,
    })

    return successToast.fire({
      icon: 'success',
      title: message
    });
  }

  showErrorToast(message: string){
    const showErrorToast =  Swal.mixin({
      toast: true,
      icon: 'error',
      position: 'top-right',
      showConfirmButton: false,
      timer: 2000,
    })

    return showErrorToast.fire({
      icon: 'error',
      title: message
    });
  }

  confirmDelete(callback: () => void) {
    return Swal.fire({
      title: 'Bạn muốn xoá phần tử này?',
      showDenyButton: true,
      confirmButtonText: 'Có',
      confirmButtonColor: "#f44336",
      denyButtonText: 'Không',
      denyButtonColor: "gray",
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    })
  }
}
