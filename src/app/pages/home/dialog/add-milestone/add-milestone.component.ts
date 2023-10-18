import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Editor, Toolbar, Validators as ngxValidators } from 'ngx-editor';
import { FormAction } from 'src/app/Model/enum/form-action';
import { ToastService } from 'src/app/services/local/toast.service';

@Component({
  selector: 'app-add-milestone',
  templateUrl: './add-milestone.component.html',
  styleUrls: ['./add-milestone.component.scss'],
})
export class AddMilestoneComponent implements OnInit {
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  milestoneForm: FormGroup;
  FORM_ACTIONS = FormAction;
  today = new Date();

  constructor(
    private dialogRef: MatDialogRef<AddMilestoneComponent>,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.milestoneForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      description: new FormControl(
        { value: '', disabled: false },
        ngxValidators.required()
      ),
      isSendMail: new FormControl(true),
    });
  }

  ngOnInit(): void {
    this.editor = new Editor();
    if(this.data?.milestone) {
      this.fillFormData(this.data?.milestone);
    }
  }

  fillFormData(milestone: any) {
    this.milestoneForm.patchValue({
      title: milestone.title,
      startDate: milestone.startDate,
      endDate: milestone.endDate,
      description: milestone.description,
      isSendMail: false,
    });
  }

  onSubmit() {
    if (this.milestoneForm.invalid) {
      this.toastService.showErrorToast('Vui lòng điền đầy đủ thông tin');
      this.milestoneForm.markAsDirty();
      return;
    }
    if(this.data?.milestone) {
      this.dialogRef.close({
        updateResult: {
          ...this.data?.milestone,
          ...this.milestoneForm.value,
        }
      });
    } else {
      this.dialogRef.close({
        result: this.milestoneForm.value,
      });
    }
  }
}
