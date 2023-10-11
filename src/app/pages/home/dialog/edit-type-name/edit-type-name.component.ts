import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/local/toast.service';

@Component({
  selector: 'app-edit-type-name',
  templateUrl: './edit-type-name.component.html',
  styleUrls: ['./edit-type-name.component.scss']
})
export class EditTypeNameComponent implements OnInit{
  isShowLoading = false;
  typeName: FormControl = new FormControl('', [Validators.required]);
  docType: any;

  constructor(private refDialog: MatDialogRef<EditTypeNameComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private toastService: ToastService) {}

  ngOnInit(): void {
    this.docType = this.data.docType;
    this.typeName.setValue(this.docType.name);
  }

  onSubmit() {
    if(!this.typeName.value) {
      this.toastService.showErrorToast('Vui lòng nhập tên loại tài liệu');
      return;
    }

    this.refDialog.close({
      ...this.docType,
      name: this.typeName.value
    })
  }
}
