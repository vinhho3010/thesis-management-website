import { Component, Input, OnInit } from '@angular/core';
import { RouteInfo } from './sidebar-data';
import { SidebarService } from 'src/app/services/local/sidebar.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  @Input() routesInfo!: RouteInfo[];
  isClassCollapsed = true;
  isStudentCollapsed = true;

  constructor(public sidebarService: SidebarService, private router: Router, private AuthService: AuthService) {

   }

  ngOnInit(): void {
    this.mapDynamicRoute(this.routesInfo);
  }

  mapDynamicRoute(routes: RouteInfo[]){
    routes.forEach(route => {
      if(route.hasChild && route.path === '/class') {
        const instructingClass = this.AuthService.getUser()?.instructClass as any[];
        route.children = instructingClass?.map((classItem) => {
          return {path: `/class/${classItem._id}`, title: `HK ${classItem.semester} - ${classItem.schoolYear}`, icon: 'book_outline'}
        });
      }

      if(route.hasChild && route.path === '/students') {
        const instructingClass = this.AuthService.getUser()?.instructClass as any[];
        route.children = instructingClass?.map((classItem) => {
          return {path: `/students/${classItem._id}`, title: `HK ${classItem.semester} - ${classItem.schoolYear}`, icon: 'people_outline'}
        });
      }
    })
  }

  getMobileMenuClass(){
    return {' translate-x-0': this.sidebarService.showMobileMenuValue == true,
            'md:translate-x-0': this.sidebarService.showMobileMenuValue == false}
  }

  handleRouting(route: RouteInfo){
      this.router.navigate([route.path]);
      this.sidebarService.setShowMobileMenu = false;
  }

  isOnRoute(route: string){
    return this.router.url.includes(route);
  }

  toggleClassCollapse(){
    this.isClassCollapsed = !this.isClassCollapsed;
    this.isStudentCollapsed = true;
  }

  toggleStudentCollapse(){
    this.isStudentCollapsed = !this.isStudentCollapsed;
    this.isClassCollapsed = true;
  }

  isSameIdStudent(path: string) {
    const arrTemp = path.split('/');
    const id = arrTemp[arrTemp.length - 1];

    return this.router.url.includes(id) && this.router.url.includes('students');

  }
}
