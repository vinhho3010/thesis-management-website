import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-topic-dialog',
  templateUrl: './register-topic.component.html',
  styleUrls: ['./register-topic.component.scss'],
})
export class RegisterTopicDialogComponent {
  registerTopicForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<RegisterTopicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.registerTopicForm = new FormGroup({
      fullName: new FormControl('', ),
      email: new FormControl('', ),
      class: new FormControl('', ),
      code: new FormControl('', ),
      topic: new FormControl('', [Validators.required]),
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
    if (this.data) {
      this.registerTopicForm.patchValue(this.data);
      this.registerTopicForm.controls['major'].setValue(this.data?.major.name);
      this.registerTopicForm.controls['teacher'].setValue(this.data?.teacher.fullName);
    }

    if(this.data.pending) {
      this.registerTopicForm.controls['topic'].setValue(this.data?.pending.topic);
      this.registerTopicForm.controls['type'].setValue(this.data?.pending.type);
      this.registerTopicForm.controls['description'].setValue(this.data?.pending.description);
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
      return;
    }
    this.matDialogRef.close({ result: this.submitData });
  }
}
