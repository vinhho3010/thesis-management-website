import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddStudentToClassComponent } from '../add-student-to-class/add-student-to-class.component';
import { ThesisService } from 'src/app/services/thesis.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { MajorService } from 'src/app/services/major.service';
import { ManageUserService } from 'src/app/services/manage-user.service';
import { MatSelectChange } from '@angular/material/select';
import { Class } from 'src/app/Model/class';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-add-thesis-to-council',
  templateUrl: './add-thesis-to-council.component.html',
  styleUrls: ['./add-thesis-to-council.component.scss'],
})
export class AddThesisToCouncilComponent {
  addThesisForm: FormGroup;
  majorList: any[] = [];
  teacherByMajor: any[] = [];
  studentList: any[] = [];

  constructor(
    private matDialogRef: MatDialogRef<AddStudentToClassComponent>,
    private thesisService: ThesisService,
    private toastService: ToastService,
    private majorService: MajorService,
    private manageUserService: ManageUserService,
    private classService: ClassService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addThesisForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
      student: new FormControl('', [Validators.required]),
      major: new FormControl('', [Validators.required]),
      teacher: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      room: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      topic: new FormControl('', [Validators.required]),
      topicEng: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadMajorList();
    this.initEditForm();
  }

  initEditForm() {
    if(this.data?.thesis){
      this.loadFollowingStudent(this.data.thesis.class._id);
      this.loadTeacherByMajor(this.data.thesis.class?.teacher?.major);
      this.addThesisForm.disable();
      this.addThesisForm.controls['time'].enable();
      this.addThesisForm.controls['room'].enable();
      this.addThesisForm.controls['date'].enable();

      this.addThesisForm.controls['code'].setValue(this.data.thesis.student.code);
      this.addThesisForm.controls['student'].setValue(this.data.thesis.student._id);
      this.addThesisForm.controls['major'].setValue(this.data.thesis.class?.teacher?.major);
      this.addThesisForm.controls['teacher'].setValue(this.data.thesis.class.teacher._id);
      this.addThesisForm.controls['date'].setValue(this.data.thesis.protectInfo.date);
      this.addThesisForm.controls['room'].setValue(this.data.thesis.protectInfo.room);
      this.addThesisForm.controls['time'].setValue(this.data.thesis.protectInfo.time);
      this.addThesisForm.controls['topic'].setValue(this.data.thesis.topic);
      this.addThesisForm.controls['topicEng'].setValue(this.data.thesis.topicEng);
    }
  }

  loadMajorList() {
    this.majorList = [];
    this.majorService.getAllmajor().subscribe({
      next: (res) => {
        this.majorList = res;
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }


  onChangeMajor(event: MatSelectChange) {
    const selectedMajor = this.addThesisForm.get('major')?.value;
    this.loadTeacherByMajor(selectedMajor);
  }

  loadTeacherByMajor(selectedMajor: string) {
    this.manageUserService.getTeacherByMajorHasClass(selectedMajor).subscribe({
      next: (res) => {
        this.teacherByMajor = res;
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }

  onChangeTeacher(event: MatSelectChange) {
    const selectedTeacher = this.teacherByMajor.find(teacher => teacher._id === this.addThesisForm.get('teacher')?.value);
    this.loadFollowingStudent(selectedTeacher?.instructClass[0]?._id);
  }

  loadFollowingStudent(classId: any) {
    this.classService.getStudentInClass(classId).subscribe({
      next: (res) => {
        this.studentList = res;
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }

  onChangeStudent(event: MatSelectChange) {
    const selectedStudent = this.addThesisForm.get('student')?.value;
    const studentResult = this.studentList.find(student => student._id === selectedStudent);
    this.addThesisForm.controls['topic'].setValue(studentResult?.thesis?.topic);
    this.addThesisForm.controls['topicEng'].setValue(studentResult?.thesis?.topicEng);
    this.addThesisForm.controls['code'].setValue(studentResult?.code);

    this.addThesisForm.controls['topic'].disable();
    this.addThesisForm.controls['topicEng'].disable();
    this.addThesisForm.controls['code'].disable();
  }

  get submitData () {
    return {
      ...this.addThesisForm.value,
      selectedStudent: this.studentList.find(student => student._id === this.addThesisForm.get('student')?.value),
      thesisId: this.studentList.find(student => student._id === this.addThesisForm.get('student')?.value)?.thesis?._id,
      protectInfo: {
        date: this.addThesisForm.get('date')?.value,
        room: this.addThesisForm.get('room')?.value,
        time: this.addThesisForm.get('time')?.value,
      }
    }
  }

  onSubmit() {
    if (this.addThesisForm.invalid) {
      this.toastService.showErrorToast('Vui lòng điền đầy đủ thông tin');
      this.addThesisForm.markAllAsTouched();
      return;
    }
    this.matDialogRef.close({ result: {
      ...this.submitData
    } });
  }
}
