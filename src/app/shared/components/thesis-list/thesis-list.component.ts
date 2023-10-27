import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pagination } from 'src/app/Model/pagination';
import { DetailThesisDialogComponent } from 'src/app/pages/ministry/dialog/detail-thesis-dialog/detail-thesis-dialog.component';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { ThesisService } from 'src/app/services/thesis.service';

@Component({
  selector: 'app-thesis-list',
  templateUrl: './thesis-list.component.html',
  styleUrls: ['./thesis-list.component.scss']
})
export class ThesisListComponent {
  thesisList: any[] = [];

  pagination: Pagination = {
    page: 0,
    limit: 6,
    length: 0,
  }

  constructor(
    private loadingService: LoaderService,
    private toastService: ToastService,
    private thesisService: ThesisService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadThesisList();
  }

  loadThesisList() {
    this.loadingService.setLoading(true);
    this.thesisService.getAllThesis(this.pagination, {isPublic: true}).subscribe({
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

  onViewDetail(thesis: any) {
    const config = {
      data: {thesis, isView: true}
    }
    const viewDialog = this.dialog.open(DetailThesisDialogComponent,config);

  }

}
