import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDocComponent } from '../../dialog/add-doc/add-doc.component';
import { RefDocsService } from 'src/app/services/ref-docs.service';
import { AuthService } from 'src/app/services/auth.service';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';
import { ToastService } from 'src/app/services/local/toast.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-ref-documents',
  templateUrl: './ref-documents.component.html',
  styleUrls: ['./ref-documents.component.scss'],
})
export class RefDocumentsComponent implements OnInit {
  classId = this.authService.getClassId() ? this.authService.getClassId() : '';
  isTeacher = this.authService.getRole() === RoleAccount.TEACHER;
  typeId = '';
  refDocsList = [] as any[];
  docType: any;

  constructor(
    private dialog: MatDialog,
    private refDocsService: RefDocsService,
    private authService: AuthService,
    private toastService: ToastService,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private loadingService: LoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.typeId = this.route.snapshot.paramMap.get('typeId') as string;
    this.getRefDocs();
    this.loadType();
  }

  onAddDoc() {
    const dialogConfig = {
      data: {
        route: this.route
      }
    }
    this.dialog.open(AddDocComponent, dialogConfig).afterClosed().subscribe({
      next: (res: any) => {
        this.getRefDocs();
      },
    });
  }

  getRefDocs() {
    this.loadingService.setLoading(true);
    this.refDocsService.getDocsOfType(this.typeId).subscribe({
      next: (res: any) => {
        this.loadingService.setLoading(false);
        this.refDocsList = res;
      },
      error: (err: any) => {
        this.loadingService.setLoading(false);
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  onDeleteDoc(doc: any) {
    this.toastService.confirmDeleteMessage('Bạn có chắc chắn muốn xóa tài liệu này?', this.firebaseService.deleteFile.bind(this.firebaseService, doc, this.getRefDocs.bind(this)));
  }

  loadType() {
    this.refDocsService.getType(this.typeId).subscribe({
      next: (res: any) => {
        this.docType = res;
      },
      error: (err: any) => {
        this.toastService.showErrorToast(err.error.message);
      },
    });
  }

  onGoBack(){
    const navigationExtra: NavigationExtras = {
      state: {
        previousIndex: 1
      }
    }
    this.router.navigate(['class'], navigationExtra);
  }
}
