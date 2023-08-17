import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidebarService } from 'src/app/services/local/sidebar.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  constructor(private sidebarService: SidebarService) { }

}
