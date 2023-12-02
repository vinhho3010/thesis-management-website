import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';
import { ManageUserService } from 'src/app/services/manage-user.service';
import { AddAccountDialogComponent } from '../../dialog/add-account-dialog/add-account-dialog.component';
import { ToastService } from 'src/app/services/local/toast.service';
import { AddFileAccountComponent } from '../../dialog/add-file-account/add-file-account.component';
import { Pagination } from 'src/app/Model/pagination';
import { PageEvent } from '@angular/material/paginator';
import { LoaderService } from 'src/app/services/loader.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-table-account',
  templateUrl: './table-account.component.html',
  styleUrls: ['./table-account.component.scss']
})
export class TableAccountComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @Input() displayedColumns!: string[];
  dataSourceInput = new MatTableDataSource();
  @Input() tableType!: RoleAccount;
  roleAccount = RoleAccount;
  searchCode = new FormControl('');
  pagination: Pagination = {
    page: 0,
    limit: 5,
    length: 0
  }

  constructor(private dialog: MatDialog, private manageUserService: ManageUserService, private toastService: ToastService, private loadingService: LoaderService) { }

  ngOnInit(): void {
    this.initDataSource();
    this.onListenSearchCode();
  }

  initDataSource(): void {
    this.loadingService.setLoading(true);
    this.manageUserService.getAllAccountWithPagination(this.pagination, this.tableType).subscribe({
      next: (response) =>{
        this.dataSourceInput.data = this.mapDataToTable(response.data);
        this.pagination.length = response.length;
        this.loadingService.setLoading(false);
      },
      error: () => {
        this.toastService.showErrorToast('Tải dữ liệu thất bại');
        this.loadingService.setLoading(false);
      }
    });
  }

  mapDataToTable(data: any): any[] {
    return data.map((item: any) => {
      return {
        ...item,
        majorName: item?.major?.name,
      }
    });
  }

  onListenSearchCode(): void {
    this.searchCode.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.handleSearchInfo(value);
    });
  }

  handleSearchInfo(value: any) {
    if(value) {
      value = value.trim();
      this.manageUserService.search(value, this.pagination, this.tableType).subscribe({
        next: (response) => {
          this.dataSourceInput.data = this.mapDataToTable(response.data);
          this.pagination.length = response.length;
          this.pagination.page = response.page;
          this.pagination.limit = response.limit;
        },
        error: () => {
          this.toastService.showErrorToast('Tải dữ liệu thất bại');
        }
      });
    } else {
      this.pagination.page = 0;
      this.pagination.limit = 5;
      this.reloadDataSource();
    }
  }

  reloadDataSource(): void {
    this.manageUserService.getAllAccountWithPagination(this.pagination, this.tableType).subscribe({
      next: (response) =>{
        this.dataSourceInput.data = this.mapDataToTable(response.data);
        this.pagination.length = response.length;
      },
      error: () => {
        this.toastService.showErrorToast('Tải dữ liệu thất bại');
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSourceInput.sort = this.sort;
  }

  onEditRow(row: any): void {
    const editAccount = this.dialog.open(AddAccountDialogComponent, {
      data: row
    });
    editAccount.afterClosed().subscribe(result => {
      if (result){
        this.initDataSource();
      }
    });
  }
  onDeleteRow(row: any): void {
    this.toastService.confirmDelete(this.handleDelete.bind(this, row._id));
  }

  handleDelete(_id: string): void {
    this.manageUserService.deleteAccount(_id).subscribe({
      next: () => {
        this.toastService.showSuccessToast('Xóa thành công');
        this.reloadDataSource();
      },
      error: () => {
        this.toastService.showErrorToast('Xóa thất bại');
      }
    });
  }

  openDialogAddFile(): void {
    const dialogRef = this.dialog.open(AddFileAccountComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.initDataSource();
      }
    });
  }

  openDialogAddAccount(): void {
    const dialogRef = this.dialog.open(AddAccountDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.reloadDataSource();
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pagination.page = event.pageIndex;
    this.pagination.limit = event.pageSize;
    if(this.searchCode.value) {
      this.handleSearchInfo(this.searchCode.value);
    } else {
      this.reloadDataSource();
    }
  }
}
