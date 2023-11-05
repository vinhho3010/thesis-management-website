import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './local/storage.service';
import { AccountInfo, ChangePasswordDto } from '../Model/account-info';
import { Router } from '@angular/router';
import { RoleAccount } from '../Model/enum/roleEnum';

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

  changePassword(data: ChangePasswordDto){
    return this.http.post<any>('/api/change-password', data)
  }


  //local session

  //save user
  saveUser(data: any){
    this.storageService.save(USER_SAVE_KEY, data.user);
    this.storageService.save(TOKEN_KEY, data.token);
  }

  saveUserData(data: any){
    this.storageService.save(USER_SAVE_KEY, data);
  }

  //get user
  getUser(): AccountInfo{
    return this.storageService.get(USER_SAVE_KEY) as AccountInfo;
  }

  refreshUserData(){
    this.http.get<AccountInfo>(`/api/user/${this.getUser()._id}`).subscribe({
      next: (res)=> {
        this.storageService.save(USER_SAVE_KEY, res as AccountInfo)
      },
      error: (err)=> {
        console.log(err);

      }
    })
  }

  getAccessToken(){
    return this.storageService.get(TOKEN_KEY) as string;
  }

  getRole(){
    const user = this.getUser();
    if(user){
      return user.role;
    }
    return null;
  }

  logout() {
    this.storageService.clean();
    this.router.navigate(['auth/login']);
  }

  isLogin(){
    return this.storageService.get(TOKEN_KEY) ? true : false;
  }

  getClassId(){
    if((this.getRole() === RoleAccount.STUDENT && !this.getUser().followClass) || (this.getRole() === RoleAccount.TEACHER && !this.getUser().instructClass)){
      this.refreshUserData();
    }
    return this.getUser().instructClass ? this.getUser().instructClass : this.getUser().followClass;
  }

}
