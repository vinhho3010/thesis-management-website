import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  showMobileMenu: boolean;

  constructor() {
    this.showMobileMenu = false;
   }

   get showMobileMenuValue(){
      return this.showMobileMenu;
   }

   set setShowMobileMenu(value: boolean){
      this.showMobileMenu = value;
   }

   toggleMobileMenu(){
      this.showMobileMenu = !this.showMobileMenu;
    }
}
