import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Milestone } from '../Model/milestone';

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {

  constructor(private http: HttpClient) { }

  getClassMilestones(classId: string){
    return this.http.get<any>(`/api/milestone/class/${classId}`);
  }

  getMilestone(id: string) {
    return this.http.get<Milestone>(`/api/milestone/${id}`);
  }

  createMilestone(classId: string, milestone: any){
    return this.http.post<any>(`/api/milestone/class/${classId}`, milestone);
  }

  updateMilestone(milestoneId: string, milestone: any){
    return this.http.put<any>(`/api/milestone/${milestoneId}`, milestone);
  }

  deleteMilestone(milestoneId: string){
    return this.http.delete<any>(`/api/milestone/${milestoneId}`);
  }
}
