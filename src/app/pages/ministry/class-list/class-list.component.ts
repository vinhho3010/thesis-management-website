import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddClassComponent } from '../dialog/add-class/add-class.component';
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
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [ 'position', 'name', 'supervisor', 'count', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onEditRow(row: any): void {
  }
  onDeleteRow(row: any): void {
  }

  onCreateClass() {
    this.dialog.open(AddClassComponent);
  }
}
