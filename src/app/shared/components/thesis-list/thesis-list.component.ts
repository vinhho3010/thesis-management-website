import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';
import { schoolYear } from 'src/app/Model/enum/schoolYear';
import { Pagination } from 'src/app/Model/pagination';
import { DetailThesisDialogComponent } from 'src/app/pages/ministry/dialog/detail-thesis-dialog/detail-thesis-dialog.component';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { MajorService } from 'src/app/services/major.service';
import { ThesisService } from 'src/app/services/thesis.service';
import { textAppearAnimation } from '../../shared.module';

@Component({
  selector: 'app-thesis-list',
  templateUrl: './thesis-list.component.html',
  styleUrls: ['./thesis-list.component.scss'],
})
export class ThesisListComponent {
  thesisList: any[] = [];
  majorList: any[] = [];
  schoolYear = schoolYear;

  pagination: Pagination = {
    page: 0,
    limit: 6,
    length: 0,
  }

  filterOptionForm = new FormGroup({
    schoolYear: new FormControl(''),
    semester: new FormControl(''),
    major: new FormControl(''),
    isPublic : new FormControl(true)
  })

  constructor(
    private loadingService: LoaderService,
    private toastService: ToastService,
    private thesisService: ThesisService,
    private dialog: MatDialog,
    private majorService: MajorService
  ) { }

  ngOnInit(): void {
    this.loadMajorList();
    this.loadThesisList();
    this.onListenFilterFormChange();
  }

  loadThesisList() {
    this.loadingService.setLoading(true);
    this.thesisService.getAllThesis(this.pagination, this.filterOptionForm.value).subscribe({
      next: (res) => {
        this.pagination.length = res.length;
        this.thesisList = res.data;
        this.loadingService.setLoading(false);
      },
      error: (err) => {
        this.loadingService.setLoading(false);
        this.toastService.showErrorToast('Không tải được danh sách');
      }
    });
  }

  loadThesisListChange(){
    this.thesisService.getAllThesis(this.pagination, this.filterOptionForm.value).subscribe({
      next: (res) => {
        this.pagination.length = res.length;
        this.thesisList = res.data;
      },
      error: (err) => {
        this.toastService.showErrorToast('Không tải được danh sách');
      }
    })
  }

  onListenFilterFormChange() {
    //if schoolyear, public type or semester change, reload council list with debounceTime 500ms
    this.filterOptionForm.valueChanges.pipe(debounceTime(500)).subscribe({
      next: () => {
        this.loadThesisListChange();
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

  onViewDetail(thesis: any) {
    const config = {
      data: {thesis, isView: true}
    }
    const viewDialog = this.dialog.open(DetailThesisDialogComponent,config);

  }
  onPageChange(event: PageEvent) {
    this.pagination.page = event.pageIndex;
    this.pagination.limit = event.pageSize;
    this.loadThesisListChange();
  }

}
