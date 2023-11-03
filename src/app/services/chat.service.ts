import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket, private authService: AuthService, private http: HttpClient) { }


  getChatList(userId: string){
    return this.http.get<any[]>(`/api/chat/user/${userId}`);
  }

  getChatRoom(userId: string, user2Id: string){
    return this.http.get<any>(`/api/chat/room/user/${userId}/user2/${user2Id}`);
  }

  createChatRoom(userId: string, user2Id: string){
    const users = [userId, user2Id];
    return this.http.post<any>(`/api/chat/room`, users);
  }

  sendMessage(msg: any){
    this.socket.emit('sendMessage', msg);
  }

  getMessage() {
    return this.socket.fromEvent('newMessage');
  }

  getMessageByRoom(roomId: string) {
    return this.http.get<any>(`api/chat/room/${roomId}`);
  }
}
