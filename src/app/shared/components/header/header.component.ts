import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SidebarService } from 'src/app/services/local/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public sidebarService: SidebarService, private router: Router) {

   }

   onLogout(): void {
    this.router.navigate(['/login']);
   }
}
