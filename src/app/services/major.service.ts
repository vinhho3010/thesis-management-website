import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Major } from '../Model/major.model';

@Injectable({
  providedIn: 'root'
})
export class MajorService {

  constructor(private http: HttpClient) { }

  getAllmajor(){
    return this.http.get<Major[]>('/api/majors');
  }
}
