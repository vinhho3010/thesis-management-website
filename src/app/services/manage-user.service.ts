import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountInfo } from '../Model/account-info';
import { RoleAccount } from '../Model/enum/roleEnum';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(private http: HttpClient) { }

  createNewAccount(data: unknown){
    return this.http.post('/api/register', data)
  }

  createListAccount(data: unknown){
    return this.http.post('/api/register-list', data)
  }

  updateAccount(id: string, data: unknown){
    return this.http.put(`/api/user/${id}`, data)
  }

  deleteAccount(id: string){
    return this.http.delete(`/api/user/${id}`)
  }

  getAllAccount(role: RoleAccount){
    return this.http.get<AccountInfo[]>(`/api/user/${role}`)
  }
}
