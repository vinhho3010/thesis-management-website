import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddClassComponent } from '../dialog/add-class/add-class.component';
import { ClassService } from 'src/app/services/class.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [ 'position', 'name', 'semester', 'supervisor', 'count', 'actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(private dialog: MatDialog, private classService: ClassService, private toastService: ToastService, private router: Router) { }

  ngOnInit(): void {
    this.loadClassList();
  }

  loadClassList(): void {
    this.classService.getAllClass().subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onEditRow(row: any): void {
    this.router.navigate(['ministry/class-list', row._id]);
  }
  onDeleteRow(row: any): void {
    this.toastService.confirmDelete(this.handleDeleteClass.bind(this, row._id));
  }

  handleDeleteClass(id: string): void {
    this.classService.delete(id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter((item) => item._id !== id);
        this.toastService.showSuccessToast('Xóa thành công');
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }

  onCreateClass() {
    const addClassDialog = this.dialog.open(AddClassComponent);
    addClassDialog.afterClosed().subscribe((res) => {
      this.loadClassList();
    });
  }
}
