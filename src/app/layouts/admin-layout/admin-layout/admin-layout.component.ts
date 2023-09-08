import { Component } from '@angular/core';
import { routesInfoAdmin } from 'src/app/shared/components/sidebar/sidebar-data';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  adminRoutesInfo = routesInfoAdmin;
}
