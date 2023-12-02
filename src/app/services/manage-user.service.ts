import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountInfo } from '../Model/account-info';
import { RoleAccount } from '../Model/enum/roleEnum';
import { PaginationResponse } from '../Model/paginationResponse';
import { Pagination } from '../Model/pagination';

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

  getAllAccountWithPagination(pagination: Pagination, role: RoleAccount){
    let params = new HttpParams({
      fromObject: {
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      }
    })
    return this.http.get<PaginationResponse>(`/api/user/roles/${role}/pagination`, {params})
  }
  getAllAccount(role: RoleAccount){
    return this.http.get<AccountInfo[]>(`/api/user/roles/${role}`)
  }

  getUserByKey(role: RoleAccount, key: string, value: string){
    const params = new HttpParams().set('key', key)
                                .set('value', value);
    return this.http.get<AccountInfo[]>(`/api/user/key-value/${role}`, {params});
  }

  getTeacherByMajor(majorId: string){
     const params = new HttpParams().set('role', RoleAccount.TEACHER);
    return this.http.get<AccountInfo[]>(`/api/user/major/${majorId}`, {params})
  }

  getTeacherByMajorHasClass(majorId: string){
    return this.http.get<AccountInfo[]>(`/api/user/major/${majorId}/has-class`)
  }

  forceChangePassword(id: string){
    const data = {
      _id: id
    }
    return this.http.put(`/api/force-change-password`, data)
  }

  search(value?: string, pagination?: Pagination, tableType?: RoleAccount){
    let params = new HttpParams();
    if(tableType){
     params = params.append('role', tableType);
    }
    if(value){
      params = params.append('value', value);
    }
    if(pagination?.page){
      params = params.append('page', pagination.page.toString());
    }
    if(pagination?.limit){
      params = params.append('limit', pagination.limit.toString());
    }
    return this.http.get<PaginationResponse>(`/api/user/search/info`, {params})
  }
}
