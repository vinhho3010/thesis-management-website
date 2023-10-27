import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Toast } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { schoolYear } from 'src/app/Model/enum/schoolYear';
import { Pagination } from 'src/app/Model/pagination';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { ThesisService } from 'src/app/services/thesis.service';
import { DetailThesisDialogComponent } from '../dialog/detail-thesis-dialog/detail-thesis-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-public-thesis',
  templateUrl: './public-thesis.component.html',
  styleUrls: ['./public-thesis.component.scss']
})
export class PublicThesisComponent implements OnInit {
  schoolYear = schoolYear;
  thesisList: any[] = [];

  pagination: Pagination = {
    page: 0,
    limit: 6,
    length: 0
  }

  filterOptionForm = new FormGroup({
    schoolYear: new FormControl(schoolYear[schoolYear.length -1]),
    semester: new FormControl(1),
    isPublic : new FormControl(false)
  })

  constructor(
    private loadingService: LoaderService,
    private toastService: ToastService,
    private thesisService: ThesisService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
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
    })
  }
  loadThesisListChange() {
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
        this.loadThesisList();
      }
    })

  }

  onViewDetail(thesis: any) {
    const config = {
      data: {thesis}
    }
    const viewDialog = this.dialog.open(DetailThesisDialogComponent,config);
    viewDialog.afterClosed().subscribe(res => {
      if(res?.result?.isPublic !== undefined || res?.result?.isPublic !== null && res?.result?.isPublic !== thesis.isPublic){
        this.thesisService.updateThesis(thesis._id, {isPublic: res.result.isPublic}).subscribe({
          next: (res) => {
            this.loadThesisListChange();
            this.toastService.showSuccessToast('Cập nhật thành công');
          },
          error: (err) => {
            this.toastService.showErrorToast('Cập nhật thất bại');
          }
        })
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pagination.page = event.pageIndex;
    this.pagination.limit = event.pageSize;
  }
}
