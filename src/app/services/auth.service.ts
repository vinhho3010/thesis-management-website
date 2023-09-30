import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './local/storage.service';
import { AccountInfo } from '../Model/account-info';
import { Router } from '@angular/router';

const USER_SAVE_KEY = 'user';
const TOKEN_KEY = 'token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) {}

  login(email: string, password: string){
    return this.http.post<any>('/api/login', {email, password})
  }


  //local session

  //save user
  saveUser(data: any){
    this.storageService.save(USER_SAVE_KEY, data.user);
    this.storageService.save(TOKEN_KEY, data.token);
  }

  //get user
  getUser(): AccountInfo{
    return this.storageService.get(USER_SAVE_KEY) as AccountInfo;
  }

  gtRole(){
    const user = this.getUser();
    if(user){
      return user.role;
    }
    return null;
  }

  logout() {
    this.storageService.clean();
    this.router.navigate(['/login']);
  }

  isLogin(){
    return this.storageService.get(TOKEN_KEY) ? true : false;
  }

}
