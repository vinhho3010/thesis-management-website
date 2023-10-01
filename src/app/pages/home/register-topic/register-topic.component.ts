import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs';
import { ToastService } from 'src/app/services/local/toast.service';
import { MajorService } from 'src/app/services/major.service';
import { ManageUserService } from 'src/app/services/manage-user.service';

@Component({
  selector: 'app-register-topic',
  templateUrl: './register-topic.component.html',
  styleUrls: ['./register-topic.component.scss']
})
export class RegisterTopicComponent implements OnInit {

  majorList: any[] = [];
  teacherList: any[] = [];
  selectedMajor: any;

  constructor(
    private majorService: MajorService,
    private manageUserService: ManageUserService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.loadMajorList();
  }

  loadMajorList(){
    this.majorService.getAllmajor().subscribe({
      next: (res) => {
        this.majorList = res;
        this.selectedMajor = this.majorList[0];
        this.loadTeacherList();
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    });

  }
  loadTeacherList(){
    this.manageUserService.getTeacherByMajorHasClass(this.selectedMajor._id).subscribe({
      next: (res) => {
        this.teacherList = res;
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }

  selectMajor(major: any){
    this.selectedMajor = major;
    this.loadTeacherList();
  }
}
