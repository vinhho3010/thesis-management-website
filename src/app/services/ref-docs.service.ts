import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileUpload } from '../Model/fileUpload';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RefDocsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  createDocForClass(doc: FileUpload, typeId: string) {
    const data = {
      title: doc.title,
      url: doc.url,
      class: this.authService.getClassId(),
      type: typeId
    }
    return this.http.post('/api/ref-docs', data);
  }

  getDocsForClass(classId: string) {
    return this.http.get(`/api/ref-docs/class/${classId}`);
  }

  deleteDocForClass(docId: string) {
    return this.http.delete(`/api/ref-docs/${docId}`);
  }

  getType(id: string) {
    return this.http.get(`/api/ref-docs/type/${id}`);
  }

  getDocsTypesOfClass(classId: string) {
    return this.http.get(`/api/ref-docs/class/${classId}/type`);
  }

  createDocTypeForClass(docTypeName: string) {
    const data = {
      name: docTypeName,
      class: this.authService.getClassId()
    }
    return this.http.post(`/api/ref-docs/class/${this.authService.getClassId()}/type`, data);
  }

  updateDocType(docId: string, docTypeName: string) {
    const data = {
      name: docTypeName
    }
    return this.http.put(`/api/ref-docs/class/type/${docId}`, data);
  }

  deleteDocType(docId: string) {
    return this.http.delete(`/api/ref-docs/class/type/${docId}`);
  }

  getDocsOfType(typeId: string) {
    return this.http.get(`/api/ref-docs/type/${typeId}/docs`);
  }

}
