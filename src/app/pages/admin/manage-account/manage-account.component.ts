import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  studentCode: string;
  fullName: string;
  class: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5'},
];

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})

export class ManageAccountComponent {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['studentCode', 'fullName', 'class', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onEditRow(row: any): void {
    console.log(row);
  }
  onDeleteRow(row: any): void {
    console.log(row);
  }

  openDialogAddAccount(): void {
    const dialogRef = this.dialog.open(ManageAccountComponent, {
      width: '50vw',
      data: {name: 'name', animal: 'animal'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
