import { Component } from '@angular/core';
import { routesInfoMinistry } from 'src/app/shared/components/sidebar/sidebar-data';

@Component({
  selector: 'app-ministry-layout',
  templateUrl: './ministry-layout.component.html',
  styleUrls: ['./ministry-layout.component.scss']
})
export class MinistryLayoutComponent {
  routesInfoMinistry = routesInfoMinistry;
}
