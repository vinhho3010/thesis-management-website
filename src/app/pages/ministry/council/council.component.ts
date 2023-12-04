import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { schoolYear } from 'src/app/Model/enum/schoolYear';
import { ClassService } from 'src/app/services/class.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { MajorService } from 'src/app/services/major.service';
import { AddCouncilComponent } from '../dialog/add-council/add-council.component';
import { CouncilService } from 'src/app/services/council.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Pagination } from 'src/app/Model/pagination';

@Component({
  selector: 'app-council',
  templateUrl: './council.component.html',
  styleUrls: ['./council.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CouncilComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'position',
    'name',
    'semester',
    'major',
    'count',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();

  pagination: Pagination = {
    page: 0,
    limit: 10,
    length: 0
  }

  majorList: any[] = [];
  schoolYear = schoolYear;
  filterOptionForm = new FormGroup({
    major: new FormControl(''),
    schoolYear: new FormControl(''),
    semester: new FormControl(''),
  })

  constructor(
    private dialog: MatDialog,
    private classService: ClassService,
    private toastService: ToastService,
    private router: Router,
    private loadingService: LoaderService,
    private majorService: MajorService,
    private councilService: CouncilService
  ) {}

  ngOnInit(): void {
    this.loadMajorList();
    this.loadCouncilList();
    this.onListenFilterChange();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  loadCouncilList(): void {
    this.loadingService.setLoading(true);
    this.councilService.getAllCouncil(this.pagination, this.filterOptionForm.value).subscribe({
      next: (res) => {
        this.loadingService.setLoading(false);
        this.dataSource.data = res.data;
        this.pagination.length = res.length;
      },
      error: (err) => {
        this.loadingService.setLoading(false);
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  loadCouncilListChange(): void {
    this.councilService.getAllCouncil(this.pagination, this.filterOptionForm.value).subscribe({
      next: (res) => {
        this.dataSource.data = res.data;
        this.pagination.length = res.length;
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  onEditRow(row: any): void {
    this.router.navigate(['ministry/council', row._id]);
  }
  onDeleteRow(row: any): void {
    this.toastService.confirmDeleteMessage('Bạn có chắc chắn muốn xóa hội đồng này?', this.handleDeleteCouncil.bind(this, row._id));
  }

  handleDeleteCouncil(id: string): void {
    this.councilService.deleteCouncil(id).subscribe({
      next: () => {
        this.toastService.showSuccessToast('Xóa thành công');
        this.loadCouncilList();
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }

  onListenFilterChange(): void {
    this.filterOptionForm.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (res) => {
        this.loadCouncilListChange();
      }
    })
  }

  onCreateCouncil(): void {
    const createDialog = this.dialog.open(AddCouncilComponent)
    createDialog.afterClosed().subscribe({
      next: (res) => {
        if(res.submitData) {
          this._createCouncil(res.submitData);
        }
      }
    })
  }

  _createCouncil(data: any): void {
    this.councilService.createCouncil(data).subscribe({
      next: (res) => {
        this.toastService.showSuccessToast('Tạo hội đồng thành công');
        this.loadCouncilList();
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }

  loadMajorList(): void {
    this.majorService.getAllmajor().subscribe({
      next: (res) => {
        this.majorList = res;
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  clearFilter(formControlName: string) {
    this.filterOptionForm.get(formControlName)?.reset();
  }

  onPageChange(event: any): void {
    this.pagination.page = event.pageIndex;
    this.pagination.limit = event.pageSize;
    this.loadCouncilListChange();
  }
}
