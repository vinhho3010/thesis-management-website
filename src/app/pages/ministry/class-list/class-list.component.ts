import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddClassComponent } from '../dialog/add-class/add-class.component';
import { ClassService } from 'src/app/services/class.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pagination } from 'src/app/Model/pagination';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [ 'position', 'name', 'semester', 'major', 'supervisor', 'count', 'actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;

  pagination: Pagination = {
    page: 0,
    limit: 5,
    length: 0
  }

  constructor(private dialog: MatDialog, private classService: ClassService, private toastService: ToastService, private router: Router, private loadingService: LoaderService) { }



  ngOnInit(): void {
    this.loadClassList();
  }

  loadClassList(): void {
    this.loadingService.setLoading(true);
    this.classService.getAllClass(this.pagination).subscribe({
      next: (res) => {
        this.pagination.length = res.length;
        this.loadingService.setLoading(false);
        this.dataSource.data = this.standardizeData(res.data);
      },
      error: (err) => {
        this.loadingService.setLoading(false);
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }

  getAllClass(): void {
    this.classService.getAllClass(this.pagination).subscribe({
      next: (res) => {
        this.pagination.length = res.length;
        this.dataSource.data = this.standardizeData(res.data);
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }

  standardizeData (data: any[]): any[] {
    return data.map((item, index) => {
      return {
        ...item,
        major: item.major.name,
        count: item.student.length,

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

  onPageChange(event: PageEvent) {
    this.pagination.page = event.pageIndex;
    this.pagination.limit = event.pageSize;
    this.getAllClass();
  }
}
