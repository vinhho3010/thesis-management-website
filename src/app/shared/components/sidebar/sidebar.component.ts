import { Component, Input } from '@angular/core';
import { RouteInfo } from './sidebar-data';
import { SidebarService } from 'src/app/services/local/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent{
  @Input() routesInfo!: RouteInfo[];

  constructor(public sidebarService: SidebarService, private router: Router) {

   }

  getMobileMenuClass(){
    return {' translate-x-0': this.sidebarService.showMobileMenuValue == true,
            'md:translate-x-0': this.sidebarService.showMobileMenuValue == false}
  }

  handleRouting(route: RouteInfo){
    if(!this.isOnRoute(route.path)){
      this.router.navigate([route.path]);
      this.sidebarService.setShowMobileMenu = false;
    }
  }

  isOnRoute(route: string){
    return this.router.url.includes(route);
  }
}
