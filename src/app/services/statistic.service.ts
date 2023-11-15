import { HttpClient } from '@angular/common/http';
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
}
