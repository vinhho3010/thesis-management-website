import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Thesis } from '../Model/thesis';

@Injectable({
  providedIn: 'root'
})
export class ThesisService {

  constructor(private http:HttpClient) { }

  getStudentThesis(id: string){
    return this.http.get<Thesis>(`/api/thesis/student/${id}`);
  }

  updateStudentThesis(id: string, data: any){
    return this.http.put(`/api/thesis/student/${id}`, data);
  }

  updateThesisCustomUrl(id: string, fileData: any, isCustomUrl: boolean){
    const data = {
      url: fileData.url,
      customFileName: fileData.title,
      isCustomUrl: isCustomUrl,
      customUrl: fileData.url
    }
    return this.http.put(`/api/thesis/${id}/custom-url`, data);
  }

  getThesisVersion(studentId: string, milestoneId: string){
    return this.http.get(`/api/thesis/student/${studentId}/milestone/${milestoneId}`);
  }

  getThesisByStudentCode(studentCode: string){
    return this.http.get<any>(`/api/thesis/user/code/${studentCode}`);
  }

  updateThesis(id: string, data: any){
    return this.http.put(`/api/thesis/${id}`, data);
  }
}
