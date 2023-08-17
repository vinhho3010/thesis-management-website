import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/local/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public sidebarService: SidebarService) {

   }
}
