import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
isHasClassInfo = this.hasClassInfo();
isTeacher = this.authService.getRole() === RoleAccount.TEACHER ? true : false;
selectedTab = 0;

  constructor(private authService: AuthService, private location: Location) {}

  ngOnInit(): void {
    this.authService.getClassId()
    const retrievedData = this.location.getState() as any;
    if(retrievedData.previousIndex){
      this.selectedTab = retrievedData.previousIndex;
    }
  }

  hasClassInfo() {
    if(this.authService.getRole() === RoleAccount.STUDENT) {
      return this.authService.getUser().followClass ? true : false;
    }

    return this.authService.getClassId() ? true : false;
  }
}
