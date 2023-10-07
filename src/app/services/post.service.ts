import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(data: unknown) {
    return this.http.post<any>(`/api/post/`, data);
  }

  getPostByClassId(classId: string) {
    return this.http.get<any>(`/api/post/class/${classId}`);
  }

  deletePost(postId: string) {
    return this.http.delete<any>(`/api/post/${postId}`);
  }

  updatePost(postId: string, data: unknown) {
    return this.http.put<any>(`/api/post/${postId}`, data);
  }
}
