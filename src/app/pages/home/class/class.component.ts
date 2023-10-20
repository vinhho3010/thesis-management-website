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
hasClassInfo = this.authService.getClassId() ? true : false;
isTeacher = this.authService.getRole() === RoleAccount.TEACHER ? true : false;
selectedTab = 0;

  constructor(private authService: AuthService, private location: Location) {}

  ngOnInit(): void {
    const retrievedData = this.location.getState() as any;
    if(retrievedData.previousIndex){
      this.selectedTab = retrievedData.previousIndex;
    }
  }
}
