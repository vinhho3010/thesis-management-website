import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Notification } from '../Model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient, private socket: Socket) { }

  getNotifications(userId: string) {
    return this.http.get<Notification[]>('api/notification/user/' + userId);
  }

  deleteAllNotifications(userId: string) {
    return this.http.delete('api/notification/user/' + userId);
  }

  markAllNotificationsAsRead(userId: string) {
    return this.http.patch(`api/notification/user/${userId}/mark-all-as-read`, null);
  }

  newNotification(notification: any) {
    this.socket.emit('sendNotification', notification);
  }

  getNewNotification() {
    return this.socket.fromEvent('newNotification');
  }

  updateNotification(id: string, notification: any) {
    return this.http.patch('api/notification/' + id, notification);
  }

  deleteNotification(id: string) {
    return this.http.delete('api/notification/' + id);
  }
}
