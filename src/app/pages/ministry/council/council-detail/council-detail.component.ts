import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { schoolYear } from 'src/app/Model/enum/schoolYear';
import { ClassService } from 'src/app/services/class.service';
import { CouncilService } from 'src/app/services/council.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { MajorService } from 'src/app/services/major.service';
import { ManageUserService } from 'src/app/services/manage-user.service';

@Component({
  selector: 'app-council-detail',
  templateUrl: './council-detail.component.html',
  styleUrls: ['./council-detail.component.scss']
})
export class CouncilDetailComponent implements OnInit {
  councilId: string;
  councilInfoForm: FormGroup;

  majors: any[] = [];
  teacherList: any[] = [];
  displayedColumns: string[] = ['studentCode', 'fullName', 'class', 'topic', 'actions'];
  dataSource = new MatTableDataSource();
  teacherByMajor: any[] = [];
  schoolYear = schoolYear;

  constructor(
    private dialog: MatDialog,
    private classService: ClassService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private loadingService: LoaderService,
    private majorService: MajorService,
    private councilService: CouncilService,
    private manageUserService: ManageUserService,
  ) {
    this.councilId = this.route.snapshot.params['id'];
    this.councilInfoForm = new FormGroup({
      name: new FormControl({}, [Validators.required]),
      major: new FormControl({}, [Validators.required]),
      president: new FormControl({}, [Validators.required]),
      secretary: new FormControl({}, [Validators.required]),
      member: new FormControl({}, [Validators.required]),
      schoolYear: new FormControl({}, [Validators.required]),
      semester: new FormControl({}, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadCouncilInfo();
    this.loadMajorList();
    //this.onChangeMajor()
  }

  loadCouncilInfo() {
    this.loadingService.setLoading(true);
    this.councilService.getCouncilById(this.councilId).subscribe({
      next: (res) => {
        this.loadingService.setLoading(false);
        this.fillDataToForm(res);

      },
      error: (err) => {
        this.loadingService.setLoading(false);
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  fillDataToForm(data: any) {
    this.councilInfoForm.patchValue({
      name: data.name,
      major: data.major._id,
      president: data.president._id,
      secretary: data.secretary._id,
      member: data.member._id,
      schoolYear: data.schoolYear,
      semester: data.semester,
    }, {emitEvent: true});

    //trigger onChangeMajor to fill select teacher
    this.onChangeMajor();
  }

  loadMajorList() {
    this.majorService.getAllmajor().subscribe({
      next: (res) => {
        this.majors = res;
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  onChangeMajor() {
    const selectedMajor = this.councilInfoForm.get('major')?.value;
    if(selectedMajor) {
      this.manageUserService.getTeacherByMajor(selectedMajor).subscribe({
        next: (res) => {
          this.teacherByMajor = res;
        },
        error: (err) => {
          this.toastService.showErrorToast(err.error.message);
        }
      })
    }
  }

  onSubmit() {

  }

  onRemoveStudent(studentId: string) {}
  onAddStudent() {}
}
