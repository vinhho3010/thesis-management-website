import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient
  ) { }

  update(id: string, data: any){
    return this.http.put<any>(`/api/comment/${id}`, data);
  }
}
