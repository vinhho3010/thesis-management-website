import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/local/toast.service';

@Component({
  selector: 'app-register-topic-dialog',
  templateUrl: './register-topic.component.html',
  styleUrls: ['./register-topic.component.scss'],
})
export class RegisterTopicDialogComponent {
  registerTopicForm: FormGroup;
  isTeacherViewDetail: boolean = this.data.isTeacherViewDetail ? this.data.isTeacherViewDetail : false;

  constructor(
    private matDialogRef: MatDialogRef<RegisterTopicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastService: ToastService
  ) {
    this.registerTopicForm = new FormGroup({
      fullName: new FormControl('', ),
      email: new FormControl('', ),
      class: new FormControl('', ),
      code: new FormControl('', ),
      topic: new FormControl('', [Validators.required]),
      topicEng: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      teacher: new FormControl('', ),
      major: new FormControl('',),
      description: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.fillData(this.data);
  }

  fillData(data: any) {
    if(this.data){
      this.registerTopicForm.patchValue(this.data);
    }
    if (this.data && !this.data.isTeacherViewDetail) {
      this.registerTopicForm.controls['major'].setValue(this.data?.major.name);
      this.registerTopicForm.controls['teacher'].setValue(this.data?.teacher.fullName);
    }

    //edit
    if(this.data.pending) {
      this.registerTopicForm.controls['topic'].setValue(this.data?.pending.topic);
      this.registerTopicForm.controls['topicEng'].setValue(this.data?.pending.topicEng);
      this.registerTopicForm.controls['type'].setValue(this.data?.pending.type);
      this.registerTopicForm.controls['description'].setValue(this.data?.pending.description);
    }

    //teacher view detail
    if(data.isTeacherViewDetail){
      this.registerTopicForm.controls['major'].setValue(this.data?.student.major.name);
      this.registerTopicForm.controls['code'].setValue(this.data?.student.code);
      this.registerTopicForm.controls['topic'].setValue(this.data?.topic);
      this.registerTopicForm.controls['topicEng'].setValue(this.data?.topicEng);
      this.registerTopicForm.controls['type'].setValue(this.data?.type);
      this.registerTopicForm.controls['description'].setValue(this.data?.description);

    }
  }
  onClose() {
    this.matDialogRef.close();
  }

  get submitData() {
    return {
      ...this.registerTopicForm.value,
      major: this.data.major,
      teacher: this.data.teacher,
    };
  }

  onSubmit() {
    if (this.registerTopicForm.invalid) {
      this.toastService.showErrorToast('Vui lòng điền đầy đủ thông tin');
      return;
    }
    this.matDialogRef.close({ result: this.submitData });
  }
}
