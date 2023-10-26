import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { schoolYear, semester } from 'src/app/Model/enum/schoolYear';
import { AuthService } from 'src/app/services/auth.service';
import { CouncilService } from 'src/app/services/council.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/local/toast.service';

@Component({
  selector: 'app-assigned-council',
  templateUrl: './assigned-council.component.html',
  styleUrls: ['./assigned-council.component.scss']
})
export class AssignedCouncilComponent implements OnInit {
  assignedList: any[] = []
  schoolYear = schoolYear;
  semester = semester;

  filterOptionForm = new FormGroup({
    schoolYear: new FormControl(schoolYear[schoolYear.length -1]),
    semester: new FormControl(1),
  })

  constructor(
    private councilService: CouncilService,
    private loadingService: LoaderService,
    private toastService: ToastService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadCouncilList();
    this.onListenFilterFormChange();
  }

  loadCouncilList() {
    this.loadingService.setLoading(true);
    const teacherId = this.authService.getUser()._id as string;
    this.councilService.getTeacherCouncil(teacherId, this.filterOptionForm.value).subscribe({
      next: (res) => {
        this.loadingService.setLoading(false);
        this.assignedList = res;
      },
      error: (err) => {
        this.loadingService.setLoading(false);
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }

  onListenFilterFormChange() {
    //if schoolyear or semester change, reload council list with debounceTime 500ms
    this.filterOptionForm.valueChanges.pipe(debounceTime(500)).subscribe({
      next: () => {
        this.loadCouncilList();
      }
    })

  }
}
