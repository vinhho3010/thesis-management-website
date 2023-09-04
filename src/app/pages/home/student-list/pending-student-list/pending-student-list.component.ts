import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  studentCode: string;
  fullName: string;
  class: string;
  topic?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5', topic: 'abc'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5', topic: 'abc'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5', topic: 'abc'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5', topic: 'abc'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5', topic: 'abc'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5', topic: 'abc'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5', topic: 'abc'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5', topic: 'abc'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5', topic: 'abc'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5', topic: 'abc'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5', topic: 'abc'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5', topic: 'abc'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5', topic: 'abc'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5', topic: 'abc'},
 {studentCode: 'B19061279', fullName: 'Hydrogen', class: 'DI1996A5', topic: 'abc'},
];
@Component({
  selector: 'app-pending-student-list',
  templateUrl: './pending-student-list.component.html',
  styleUrls: ['./pending-student-list.component.scss']
})
export class PendingStudentListComponent {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['studentCode', 'fullName', 'class', 'topic', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onEditRow(row: any): void {
    console.log(row);
  }
  onDeleteRow(row: any): void {
    console.log(row);
  }
}
