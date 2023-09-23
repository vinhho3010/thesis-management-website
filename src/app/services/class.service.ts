import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) { }

  createClass(data: unknown){
    return this.http.post('/api/class', data)
  }

  delete(id: string){
    return this.http.delete(`/api/class/${id}`)
  }

  getClassInfo(id: string){
    return this.http.get<any>(`/api/class/${id}`)
  }

  getAllClass(){
    return this.http.get<any>(`/api/class`)
  }
}
