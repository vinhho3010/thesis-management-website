import { Component } from '@angular/core';
import { AddDocComponent } from '../../dialog/add-doc/add-doc.component';
import { MatDialog } from '@angular/material/dialog';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ToastService } from 'src/app/services/local/toast.service';
import { RefDocsService } from 'src/app/services/ref-docs.service';
import { AddDocTypeComponent } from '../../dialog/add-doc-type/add-doc-type.component';
import { Router } from '@angular/router';
import { EditTypeNameComponent } from '../../dialog/edit-type-name/edit-type-name.component';

@Component({
  selector: 'app-ref-doc-types',
  templateUrl: './ref-doc-types.component.html',
  styleUrls: ['./ref-doc-types.component.scss']
})
export class RefDocTypesComponent {
  classId = this.authService.getClassId() ? this.authService.getClassId() : '';
  isTeacher = this.authService.getRole() === RoleAccount.TEACHER;
  refDocsTypeList = [] as any[];

  constructor(
    private dialog: MatDialog,
    private refDocsService: RefDocsService,
    private authService: AuthService,
    private toastService: ToastService,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRefDocsType();
  }

  onAddDoc() {
    this.dialog.open(AddDocTypeComponent).afterClosed().subscribe({
      next: (res: any) => {
        this.getRefDocsType();
      },
    });
  }

  getRefDocsType() {
    this.refDocsService.getDocsTypesOfClass(this.classId as string).subscribe({
      next: (res: any) => {
        this.refDocsTypeList = res;
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  onDeleteDocType(event: any, docType: any) {
    event.stopPropagation();
   this.toastService.confirmDeleteMessage('Bạn có chắc chắn muốn xóa chủ đề này?', this.deleteDocTypeHandle.bind(this, docType));
  }

  onEditDocTypeName(event: any, docType: any) {
    event.stopPropagation();
    const dialogConfig = {
      data: {
        docType: docType,
      },
    };
    this.dialog.open(EditTypeNameComponent, dialogConfig).afterClosed().subscribe({
      next: (res: any) => {
        if(res) {
          const docTypeRes = res

          if(docTypeRes.name === docType.name) return;
          this.editDocTypeHandle(docTypeRes);
          this.getRefDocsType();
        }
      },
    });
  }

  deleteDocTypeHandle(docType: any) {
    this.refDocsService.deleteDocType(docType._id).subscribe({
      next: (res: any) => {
        this.toastService.showSuccessToast('Xóa chủ đề tài liệu thành công');
        this.getRefDocsType();
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  editDocTypeHandle(docType: any) {
    this.refDocsService.updateDocType(docType._id, docType.name).subscribe({
      next: (res: any) => {
        this.toastService.showSuccessToast('Sửa tên chủ đề tài liệu thành công');
        this.getRefDocsType();
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  handleClickNavigate(docType: any) {
    this.router.navigate([`/class/documents/type/${docType._id}`]);
  }
}
