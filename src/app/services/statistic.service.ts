import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(
    private http: HttpClient
  ) { }

  accountPerRole() {
    return this.http.get<any>('/api/user/statistic/per-role');
  }

  countAccount() {
    return this.http.get<any>('/api/user/statistic/count');
  }

  countThesis(semester?:string, schoolYear?:string) {
    let params = new HttpParams();
    if(semester){
      params = params.append('semester', semester);
    }
    if(schoolYear){
      params = params.append('schoolYear', schoolYear);
    }

    return this.http.get<any>('/api/thesis/statistic/', {params});
  }

  countThesisByMajor(semester?:string, schoolYear?:string) {
    let params = new HttpParams();
    if(semester){
      params = params.append('semester', semester);
    }
    if(schoolYear){
      params = params.append('schoolYear', schoolYear);
    }

    return this.http.get<any>('/api/thesis/statistic/major', {params});
  }

  countThesisBySchoolyear(schoolYear:string[]) {
    let params = new HttpParams();
    if(schoolYear){
      params = params.append('schoolYear', schoolYear.join(','));
    }

    return this.http.get<any>('/api/thesis/statistic/schoolYear', {params});
  }
}
