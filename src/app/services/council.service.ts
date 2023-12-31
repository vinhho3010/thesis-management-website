import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../Model/pagination';
import { PaginationResponse } from '../Model/paginationResponse';

@Injectable({
  providedIn: 'root'
})
export class CouncilService {

  constructor(private http: HttpClient) { }

  getAllCouncil(pagination: Pagination,filterCondition?: any) {
    let params = new HttpParams({
      fromObject: {
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      }
    })

    if(filterCondition.major) {
      params = params.append('majorId', filterCondition.major);
    }
    if(filterCondition.schoolYear) {
      params = params.append('schoolYear', filterCondition.schoolYear);
    }
    if(filterCondition.semester) {
      params = params.append('semester', filterCondition.semester);
    }
    return this.http.get<PaginationResponse>('api/council', {params});
  }

  getTeacherCouncil(teacherId: string, filterCondition?: any) {
    let params = new HttpParams();
    if(filterCondition.schoolYear) {
      params = params.set('schoolYear', filterCondition.schoolYear);
    }
    if(filterCondition.semester) {
      params = params.set('semester', filterCondition.semester);
    }
    return this.http.get<any>(`api/council/teacher/${teacherId}`, {params});
  }

  getCouncilById(id: string) {
    return this.http.get<any>(`api/council/${id}`);
  }

  createCouncil(data: any) {
    return this.http.post('api/council', data);
  }

  updateCouncil(id: string, data: any) {
    return this.http.put(`api/council/${id}`, data);
  }

  deleteCouncil(id: string) {
    return this.http.delete(`api/council/${id}`);
  }

  addThesisToCouncil(councilId: string, thesisId: string, data: any) {
    return this.http.put(`api/council/${councilId}/thesis/${thesisId}`, data);
  }

  removeThesisFromCouncil(councilId: string, thesisId: string) {
    return this.http.delete(`api/council/${councilId}/thesis/${thesisId}`);
  }

  getCouncilByThesisId(thesisId: string) {
    return this.http.get<any>(`api/council/thesis/${thesisId}`);
  }

}
