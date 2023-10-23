import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CouncilService {

  constructor(private http: HttpClient) { }

  getAllCouncil(filterCondition?: any) {
    let params = new HttpParams()

    if(filterCondition.major) {
      params = params.append('majorId', filterCondition.major);
    }
    if(filterCondition.schoolYear) {
      params = params.append('schoolYear', filterCondition.schoolYear);
    }
    if(filterCondition.semester) {
      params = params.append('semester', filterCondition.semester);
    }
    return this.http.get<any>('api/council', {params});
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
}
