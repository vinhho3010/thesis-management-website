import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Thesis } from '../Model/thesis';

@Injectable({
  providedIn: 'root'
})
export class ThesisService {

  constructor(private http:HttpClient) { }

  getStudentThesis(id: string, withStudent?: boolean){
    let params = new HttpParams();
    if(withStudent){
      params = params.append('withStudent', withStudent);
    }
    return this.http.get<Thesis>(`/api/thesis/student/${id}`, {params});
  }

  updateStudentThesis(id: string, data: any){
    return this.http.put(`/api/thesis/student/${id}`, data);
  }
}
