/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'src/app/services/local/toast.service';

export interface TableColumn {
  key: string;
  header: string;
  type: string;
}

export interface TableAction<T> {
  icon: string;
  color: string;
  tooltip: string;
  action: (row: T) => void;
}

export interface Pagination {
  pageSize: number;
  page: number;
  totalRecords: number;
}
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements OnInit, AfterViewInit {
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() columns: TableColumn[] = [];
  @Input() additionalActions?: TableAction<any>[] = [];
  @Input() disableDefaultAction?: boolean = false;
  @Input() editRouting?: string = '';
  @Input() pagination!: Pagination;
  @ViewChild(MatSort) sort!: MatSort ;

  @Output() changeDataTable = new EventEmitter<Pagination>();
  displayedColumns: string[] = [];
  orderBy?: string = '';

  public loading = true;
  dataInitCompleted = false;

  actions: TableAction<any>[] = [
    {icon: 'edit', color: 'primary', tooltip:'Edit', action: (row) => this.onEdit(row.id) },
  ];

  constructor(private toastService: ToastService, private router: Router){}

  ngOnInit() {
    if (this.columns) {
      this.displayedColumns = this.columns.map(item => item.key);
    }
    if (this.additionalActions) {
      this.actions = this.additionalActions.concat(this.actions);
    }
    if(!this.disableDefaultAction){
      this.displayedColumns.push('actions');
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onPageChange(event: PageEvent) {
    this.pagination.page = event.pageIndex;
    this.pagination.pageSize = event.pageSize;
    this.changeDataTable.emit(this.pagination);
  }

  onEdit(id: string) {
    this.router.navigate([this.editRouting, id]);
  }
}
