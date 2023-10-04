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

  update(id: string, data: unknown){
    return this.http.put(`/api/class/${id}`, data)
  }

  getClassInfo(id: string){
    return this.http.get<any>(`/api/class/${id}`)
  }

  getAllClass(){
    return this.http.get<any>(`/api/class`)
  }

  getStudentInClass(id: string){
    return this.http.get<any>(`/api/class/${id}/student`)
  }

  addStudentToClass(id: string, data: unknown){
    return this.http.post(`/api/class/${id}/add-student`, data)
  }

  removeStudentFromClass(id: string, studentId: string){
    return this.http.delete(`/api/class/${id}/remove-student/${studentId}`)
  }



  //*************************pending request*****************************

  registerToClass(data: unknown){
    return this.http.post(`/api/pending-class`, data)
  }

  updateRegister(id: string, data: unknown){
    return this.http.put(`/api/pending-class/${id}`, data)
  }

  cancelRegister(id: string) {
    return this.http.delete(`/api/pending-class/${id}`)
  }

  getPendingStudents(id: string){
    return this.http.get<any>(`/api/pending-class/class/${id}`)
  }

  approvePendingItem(id: string){
    return this.http.get(`/api/pending-class/${id}/approve`)
  }

  rejectPendingItem(id: string){
    return this.http.get(`/api/pending-class/${id}/reject`)
  }

  getPendingRequestOfStudent(id: string){
    return this.http.get<any>(`/api/pending-class/student/${id}`)
  }
}
