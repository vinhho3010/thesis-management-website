import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { ThesisStatus } from 'src/app/Model/enum/thesis-status';
import { Thesis } from 'src/app/Model/thesis';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { RouterExtService } from 'src/app/services/ex-router.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { MajorService } from 'src/app/services/major.service';
import { ThesisService } from 'src/app/services/thesis.service';

@Component({
  selector: 'app-thesis-detail-list',
  templateUrl: './thesis-detail-list.component.html',
  styleUrls: ['./thesis-detail-list.component.scss'],
})
export class ThesisDetailListComponent implements OnInit {
  studentList: any[] = [];
  classId!: string;
  selectedStudent!: any;
  detailThesisForm: FormGroup;
  studentForm: FormGroup;
  majorList: any[] = [];
  selectedThesis: Thesis | undefined;
  thesisStatusArray = Object.values(ThesisStatus);
  THESIS_STATUS = ThesisStatus;

  constructor(
    private authService: AuthService,
    private classService: ClassService,
    private thesisService: ThesisService,
    private toastService: ToastService,
    private majorService: MajorService,
    private location: Location,
    private routerExService: RouterExtService,
    private router: Router,
    private loadingService: LoaderService,
    private route: ActivatedRoute
  ) {
    this.detailThesisForm = new FormGroup({
      type: new FormControl(''),
      topic: new FormControl(''),
      topicEng: new FormControl(''),
      description: new FormControl(''),
      status: new FormControl(''),
      semester: new FormControl(''),
      schoolyear: new FormControl(''),
    });
    this.studentForm = new FormGroup({
      fullName: new FormControl(''),
      class: new FormControl(''),
      major: new FormControl(''),
      code: new FormControl(''),
      email: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.classId = this.route.snapshot.paramMap.get('id') as string;
    const retrievedData = this.location.getState() as any;
    if(retrievedData?.selectedStudent) {
      this.onChangeStudent(retrievedData.selectedStudent);
    }
    this.loadMajorList();
    this.loadStudentList();
    this.onListenThesisStatusChange();
  }

  loadMajorList(): void {
    this.majorService.getAllmajor().subscribe({
      next: (res) => {
        this.majorList = res;
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }

  loadStudentList(): void {
    this.loadingService.setLoading(true);
    this.classService.getStudentInClass(this.classId).subscribe({
      next: (res) => {
        this.loadingService.setLoading(false);
        this.studentList = res;
      },
      error: (err) => {
        this.loadingService.setLoading(false);
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  loadStudentListChange(): void {
    this.classService.getStudentInClass(this.classId).subscribe({
      next: (res) => {
        this.studentList = res;
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  onChangeStudent(student: any): void {
    this.selectedStudent = student;
    this.thesisService.getStudentThesis(student._id).subscribe({
      next: (res) => {
        this.fillDataStudent(student);
        this.detailThesisForm.patchValue(res, {emitEvent: false});
        this.selectedThesis = res;
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  fillDataStudent(student: any): void {
    this.studentForm.patchValue(student, {emitEvent: false});
    this.studentForm.controls['major'].setValue(student.major._id);
  }

  get submitData() {
    return this.detailThesisForm.value;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.handleSubmitThesis();

  }

  onGoBack(): void {
    this.router.navigate([`/students/${this.classId}`]);
  }

  handleSubmitThesis(): void {
    this.thesisService.updateStudentThesis(this.selectedStudent._id, this.submitData).subscribe({
      next: () => {
        this.toastService.showSuccessToast('Cập nhật thành công');
        this.loadStudentListChange();
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  onListenThesisStatusChange(){
    this.detailThesisForm.get('status')?.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
        this.handleSubmitThesis();
    })
  }
}
