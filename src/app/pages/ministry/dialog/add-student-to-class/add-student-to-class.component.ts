import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime } from 'rxjs';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';
import { ManageUserService } from 'src/app/services/manage-user.service';

@Component({
  selector: 'app-add-student-to-class',
  templateUrl: './add-student-to-class.component.html',
  styleUrls: ['./add-student-to-class.component.scss']
})
export class AddStudentToClassComponent implements OnInit{
  findStudentForm: FormGroup;
  studentResult: any = null;
    constructor(private matDialogRef: MatDialogRef<AddStudentToClassComponent>, private manageUserService: ManageUserService) {
      this.findStudentForm = new FormGroup({
        studentCode: new FormControl('', [Validators.required]),
        studentName: new FormControl('', [Validators.required]),
      });
     }

     ngOnInit(): void {
      this.findStudentForm.controls['studentCode'].valueChanges.pipe(debounceTime(500))
      .subscribe((res) => {
        this.findStudentInfo();
      })
     }

    onClose() {
      this.matDialogRef.close({result: null});
    }

    findStudentInfo(){
      const studentCode = this.findStudentForm.value.studentCode as string;
      this.manageUserService.getUserByKey(RoleAccount.STUDENT, 'code', studentCode.toUpperCase()).subscribe({
        next: (res) => {
          if(res.length > 0){
            this.studentResult = res[0];
            this.findStudentForm.controls['studentName'].setValue(res[0].fullName);
          } else {
            this.studentResult = null;
            this.findStudentForm.controls['studentName'].setValue('');
          }
        },
        error: (err) => {
          this.findStudentForm.controls['studentName'].setValue('');
        }
      })
    }

    onSubmit() {
      if(this.findStudentForm.invalid){
        return;
      }
      this.matDialogRef.close({result: this.studentResult});
    }
}
