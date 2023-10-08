import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileUpload } from '../Model/fileUpload';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RefDocsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  createDocForClass(doc: FileUpload) {
    const data = {
      title: doc.title,
      url: doc.url,
      class: this.authService.getClassId()
    }
    return this.http.post('/api/ref-docs', data);
  }

  getDocsForClass(classId: string) {
    return this.http.get(`/api/ref-docs/class/${classId}`);
  }
}
