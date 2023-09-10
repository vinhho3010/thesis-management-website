import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddAccountDialogComponent } from '../dialog/add-account-dialog/add-account-dialog.component';
import { ManageUserService } from 'src/app/services/manage-user.service';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})

export class ManageAccountComponent {
  tableTypeRole = RoleAccount;
  displayedColumnsStudent: string[] = ['position', 'code', 'fullName', 'type', 'actions'];
  displayedColumnsTeacher: string[] = ['position', 'code', 'fullName', 'class', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(private manageUserService: ManageUserService) { }

}
