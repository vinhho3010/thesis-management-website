import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidebarService } from 'src/app/services/local/sidebar.service';
import { routesInfo } from 'src/app/shared/components/sidebar/sidebar-data';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  routesInfo = routesInfo;

  constructor(private sidebarService: SidebarService) { }

}
