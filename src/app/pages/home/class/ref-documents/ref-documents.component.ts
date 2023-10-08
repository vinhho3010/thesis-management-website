import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDocComponent } from '../../dialog/add-doc/add-doc.component';
import { RefDocsService } from 'src/app/services/ref-docs.service';
import { AuthService } from 'src/app/services/auth.service';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';

@Component({
  selector: 'app-ref-documents',
  templateUrl: './ref-documents.component.html',
  styleUrls: ['./ref-documents.component.scss']
})
export class RefDocumentsComponent implements OnInit {
  classId = this.authService.getClassId() ? this.authService.getClassId() : '';
  isTeacher = this.authService.getRole() === RoleAccount.TEACHER;
  refDocsList = [] as any[];

  constructor(private dialog: MatDialog, private refDocsService: RefDocsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getRefDocs();
  }

  onAddDoc() {
    this.dialog.open(AddDocComponent);
  }

  getRefDocs() {
    this.refDocsService.getDocsForClass(this.classId as string).subscribe({
      next: (res: any) => {
        this.refDocsList = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
