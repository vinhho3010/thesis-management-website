import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';

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
  selector: 'app-active-student-list',
  templateUrl: './active-student-list.component.html',
  styleUrls: ['./active-student-list.component.scss']
})
export class ActiveStudentListComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['studentCode', 'fullName', 'class', 'actions'];
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
