import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Thesis } from '../Model/thesis';
import { Pagination } from '../Model/pagination';
import { PaginationResponse } from '../Model/paginationResponse';

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
    return this.http.put<any>(`/api/thesis/${id}`, data);
  }

  scoringThesis(thesisId: string, data: any) {
    return this.http.put(`api/thesis/${thesisId}/scoring`, data);
  }

  getAllThesis(pagination: Pagination, optionalParams: any){
    let params = new HttpParams({
      fromObject: {
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      }
    });
    if(optionalParams.schoolYear){
      params = params.append('schoolYear', optionalParams.schoolYear);
    }
    if(optionalParams.semester){
      params = params.append('semester', optionalParams.semester);
    }
    if(optionalParams.isPublic!==null || optionalParams.isPublic!==undefined){
      params = params.append('isPublic', optionalParams.isPublic);
    }
    if(optionalParams.major){
      params = params.append('majorId', optionalParams.major);
    }
    return this.http.get<PaginationResponse>(`/api/thesis`, {params});
  }

  addCommentThesisVersion(thesisVersionId: string, data: any){
    return this.http.put<any>(`/api/thesis-version/${thesisVersionId}/add-comment`, data);
  }

  deleteCommentThesisVersion(thesisVersionId: string, commentId: string){
    return this.http.delete<any>(`/api/thesis-version/${thesisVersionId}/delete-comment/${commentId}`);
  }
}
