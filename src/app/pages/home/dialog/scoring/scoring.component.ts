import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastService } from 'src/app/services/local/toast.service';

@Component({
  selector: 'app-scoring',
  templateUrl: './scoring.component.html',
  styleUrls: ['./scoring.component.scss']
})
export class ScoringComponent implements OnInit {
  url!: string;
  thesis!: any;
  mark = new FormControl('', [Validators.required]);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private refDialog: MatDialogRef<ScoringComponent>,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    if(this.data?.thesis) {
      this.url = this.data?.thesis?.url;
      this.thesis = this.data?.thesis;

      if(this.thesis?.markedByteacher){
        this.mark.setValue(this.thesis?.markedByteacher?.mark);
      }
    }
  }

  onSubmit() {
    if(this.mark.valid) {
      if(this.mark.value) {
        const result = {
          mark: this.mark.value,
          thesis: this.thesis._id,
          teacher: this.thesis?.class.teacher._id
        }
        this.refDialog.close({result});
      }
    } else {
      this.mark.markAsTouched();
      this.toastService.showErrorToast('Vui lòng nhập điểm');
    }
  }
}
