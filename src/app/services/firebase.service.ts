import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../Model/fileUpload';
import { RefDocsService } from './ref-docs.service';
import { ToastService } from './local/toast.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private basePath = '/uploads';

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private refDocsService: RefDocsService,
    private toastService: ToastService
    ) { }

  addDocForClass(fileUpload: FileUpload, typeId:string): any {
    return this.pushFileToStorage(fileUpload, this.saveFileDataToRefDoc.bind(this, fileUpload, typeId));
  }

  pushFileToStorage(fileUpload: FileUpload, storeUrlFile: Function): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.title = fileUpload.file.name;
          storeUrlFile(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
}

  private saveFileDataToRefDoc(fileUpload: FileUpload, typeId: string): void {
    this.refDocsService.createDocForClass(fileUpload, typeId).subscribe({
      next: (res) => {
        this.toastService.showSuccessToast('Upload file thành công');
      },
      error: (err) => {
        this.toastService.showErrorToast('Upload file thất bại');
      }
    });
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: any, reloadCallback?: Function): void {
    this.refDocsService.deleteDocForClass(fileUpload._id as string).subscribe({
      next: (res) => {
        this.deleteFileStorage(fileUpload.title);
        this.toastService.showSuccessToast('Xóa file thành công');
        if(reloadCallback){
          reloadCallback();
        }
      },
      error: (err) => {
        this.toastService.showErrorToast('Xóa file thất bại');
      }
    });
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
