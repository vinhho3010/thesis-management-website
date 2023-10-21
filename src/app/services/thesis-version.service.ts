import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileUpload } from '../Model/fileUpload';

@Injectable({
  providedIn: 'root'
})
export class ThesisVersionService {

  constructor(private http: HttpClient) { }

  getVersionStudentMilestone(studentId: string, milestoneId: string) {
    return this.http.get<any>(`/api/thesis-version/milestone/${milestoneId}/student/${studentId}`);
  }

  getStudentThesisVersion(studentId: string) {
    return this.http.get<any>(`/api/thesis-version/student/${studentId}`);
  }

  updateThesisVersionUrl(id: string, fileData: FileUpload | any) {
    const data = {
      url: fileData.url,
      fileName: fileData.title
    }
    return this.http.put(`/api/thesis-version/${id}/url`, data);
  }

  updateThesisVersion(id: string, data: any) {
    return this.http.put(`/api/thesis-version/${id}`, data);
  }
}
