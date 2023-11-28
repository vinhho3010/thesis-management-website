import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScoringComponent } from 'src/app/pages/home/dialog/scoring/scoring.component';
import { ToastService } from 'src/app/services/local/toast.service';

@Component({
  selector: 'app-detail-thesis-dialog',
  templateUrl: './detail-thesis-dialog.component.html',
  styleUrls: ['./detail-thesis-dialog.component.scss']
})
export class DetailThesisDialogComponent {
  url!: string;
  thesis!: any;
  isPublic = new FormControl('', [Validators.required]);
  avgScore: any;
  isView: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private refDialog: MatDialogRef<DetailThesisDialogComponent>,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    if(this.data?.thesis) {
      this.url = this.data?.thesis?.url;
      this.thesis = this.data?.thesis;

      if(this.thesis?.results?.length > 0){
        this.avgScore = 0;
        this.thesis.results.forEach((result: any) => {
          this.avgScore += result.mark;
        });
        this.avgScore = (this.avgScore / this.thesis.results.length).toFixed(2);
      }

      if(this.thesis.isPublic !== undefined || this.thesis.isPublic !== null){
        this.isPublic.setValue(this.thesis.isPublic);
      }
    }

    if(this.data?.isView) {
      this.isView = true;
    }
  }

  onSubmit() {
    if(this.isPublic.value !== undefined || this.isPublic.value !== null) {
      const result = {
        isPublic: this.isPublic.value,
        thesis: this.thesis._id,
      }
      this.refDialog.close({result});
    }
  }
}
