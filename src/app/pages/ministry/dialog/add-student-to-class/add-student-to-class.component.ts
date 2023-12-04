import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime } from 'rxjs';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';
import { MajorService } from 'src/app/services/major.service';
import { ManageUserService } from 'src/app/services/manage-user.service';

@Component({
  selector: 'app-add-student-to-class',
  templateUrl: './add-student-to-class.component.html',
  styleUrls: ['./add-student-to-class.component.scss']
})
export class AddStudentToClassComponent implements OnInit{
  findStudentForm: FormGroup;
  studentResult: any = null;
  majorList: any[] = [];

    constructor(private matDialogRef: MatDialogRef<AddStudentToClassComponent>, private manageUserService: ManageUserService, private majorService: MajorService) {
      this.findStudentForm = new FormGroup({
        studentCode: new FormControl('', [Validators.required]),
        studentName: new FormControl('', [Validators.required]),
        major: new FormControl('', [Validators.required]),
        class: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
      });
     }

     ngOnInit(): void {
      this.findStudentForm.controls['studentCode'].valueChanges.pipe(debounceTime(500))
      .subscribe((res) => {
        this.findStudentInfo();
      });

      this.loadMajorList();
     }

    onClose() {
      this.matDialogRef.close({result: null});
    }

    loadMajorList() {
      this.majorService.getAllmajor().subscribe({
        next: (res) => {
          this.majorList = res;
        },
        error: (err) => {
          this.majorList = [];
        }
      })
    }

    findStudentInfo(){
      const studentCode = this.findStudentForm.value.studentCode as string;
      this.manageUserService.getUserByKey(RoleAccount.STUDENT, 'code', studentCode.toUpperCase()).subscribe({
        next: (res) => {
          if(res.length > 0){
            this.studentResult = res[0];
            this.fillFormData(this.studentResult);
          } else {
            this.studentResult = null;
            this.findStudentForm.reset({
              studentCode: studentCode
            });
          }
        },
        error: (err) => {
          this.studentResult = null;
          this.findStudentForm.reset({
            studentCode: studentCode
          });
        }
      })
    }

    fillFormData(data: any){
      this.findStudentForm.controls['studentName'].setValue(data.fullName, {emitEvent: false});
      this.findStudentForm.controls['major'].setValue(this.majorList.find(x => x._id === data.major).name, {emitEvent: false});
      this.findStudentForm.controls['class'].setValue(data.class, {emitEvent: false});
      this.findStudentForm.controls['email'].setValue(data.email, {emitEvent: false});
    }

    onSubmit() {
      if(this.findStudentForm.invalid){
        return;
      }
      this.matDialogRef.close({result: this.studentResult});
    }
}
