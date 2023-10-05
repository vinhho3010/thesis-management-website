import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { ToastService } from 'src/app/services/local/toast.service';

@Component({
  selector: 'app-active-student-list',
  templateUrl: './active-student-list.component.html',
  styleUrls: ['./active-student-list.component.scss']
})
export class ActiveStudentListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['code', 'fullName', 'class', 'actions'];
  dataSource = new MatTableDataSource([]);
  classOfTeacher = this.authService.getUser().instructClass as string;

  constructor(private authService: AuthService, private classService: ClassService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.loadStudentList();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onEditRow(row: any): void {
    console.log(row);
  }
  onDeleteRow(row: any): void {
    console.log(row);
  }

  loadStudentList(): void {
    this.classService.getStudentInClass(this.classOfTeacher).subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }

  onRemoveStudent(student: any){
    console.log(student);
    this.toastService.confirmHandle('Bạn có chắc chắn muốn xóa sinh viên khỏi nhóm?', this.removeStudentHandler.bind(this, student._id));

  }

  removeStudentHandler(studentId: string): void {
    this.classService.removeStudentFromClass(this.classOfTeacher, studentId).subscribe({
      next: () => {
        this.toastService.showSuccessToast('Xóa sinh viên khỏi nhóm thành công');
        this.loadStudentList();
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }
}
