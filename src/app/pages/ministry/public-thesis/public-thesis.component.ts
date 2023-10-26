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

  onListenFilterFormChange() {
    //if schoolyear, public type or semester change, reload council list with debounceTime 500ms
    this.filterOptionForm.valueChanges.pipe(debounceTime(500)).subscribe({
      next: () => {
        this.loadThesisList();
      }
    })

  }

  onPageChange(event: PageEvent) {
    this.pagination.page = event.pageIndex;
    this.pagination.limit = event.pageSize;
  }
}
